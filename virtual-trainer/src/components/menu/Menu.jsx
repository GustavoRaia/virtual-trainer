import React, { useState } from 'react';
import { marked } from 'marked';
import { jsPDF } from 'jspdf';

const Menu = () => {
    const [age, setAge] = useState('');
    const [previousTrainingTime, setPreviousTrainingTime] = useState('');
    const [goal, setGoal] = useState('');
    const [trainingPerWeek, setTrainingPerWeek] = useState('');
    const [trainingDuration, setTrainingDuration] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [trainingPlan, setTrainingPlan] = useState(null); // Novo estado para armazenar a resposta da API
    const [error, setError] = useState(null); // Novo estado para armazenar erros

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            age: age,
            previousTrainingTime: previousTrainingTime,
            goal: goal,
            trainingPerWeek: trainingPerWeek,
            trainingDuration: trainingDuration,
            extraInfo: extraInfo
        };

        const prompt = `Crie um treino para um jovem de ${userData.age} anos que começou a treinar há ${userData.previousTrainingTime} meses e gostaria de um protocolo para quem vai treinar ${userData.trainingPerWeek} vezes na semana durante ${userData.trainingDuration} minutos cada dia e com foco em ${userData.goal}. Além disso, possui obstáculos como ${userData.extraInfo}`;

        try {
            const response = await fetch('https://api-virtual-trainer.vercel.app/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (response.ok) {
                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    setTrainingPlan(data);
                } catch (jsonError) {
                    setTrainingPlan(text); // Trata a resposta como texto
                }
            } else {
                const errorData = await response.json();
                setError(`Erro ao gerar o treino: ${errorData.message}`);
            }
        } catch (error) {
            setError(`Erro ao gerar o treino (CATCH): ${error.message}`);
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(trainingPlan, 10, 10);
        doc.save("protocolo_de_treino.pdf");
    };

    return (
        <div className="container mx-auto mt-32">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-5 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2 font-bold text-gray-700">
                        Idade:
                    </label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="previousTrainingTime" className="block mb-2 font-bold text-gray-700">
                        Tempo de treino (meses):
                    </label>
                    <input
                        type="number"
                        id="previousTrainingTime"
                        value={previousTrainingTime}
                        onChange={(e) => setPreviousTrainingTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="goal" className="block mb-2 font-bold text-gray-700">
                        Objetivo na academia:
                    </label>
                    <input
                        type="text"
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="trainingPerWeek" className="block mb-2 font-bold text-gray-700">
                        Quantidade de Treinos por Semana
                    </label>
                    <input
                        type="text"
                        id="trainingPerWeek"
                        value={trainingPerWeek}
                        onChange={(e) => setTrainingPerWeek(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="trainingDuration" className="block mb-2 font-bold text-gray-700">
                        Duração do Treino (em minutos)
                    </label>
                    <input
                        type="number"
                        id="trainingDuration"
                        value={trainingDuration}
                        onChange={(e) => setTrainingDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="extraInfo" className="block mb-2 font-bold text-gray-700">
                        Possui alguma doença, cirurgia recente ou faz utilização de algum remédio?
                    </label>
                    <textarea
                        id="extraInfo"
                        value={extraInfo}
                        onChange={(e) => setExtraInfo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-32 mx-36 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Gerar Treino
                </button>
            </form>

            {error && (
                <div className="mt-4 max-w-md mx-auto bg-red-100 p-4 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {trainingPlan && (
                <div className="my-16 max-w-md mx-auto bg-white p-5 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Protocolo de Treino</h2>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(trainingPlan) }} />
                    <button
                        onClick={handleDownloadPDF}
                        className="ms-80 mt-4 px-1 py-1 text-white border border-black-100 rounded-md hover:bg-gray-200"
                    >
                        <img src="https://static.vecteezy.com/system/resources/previews/019/879/209/non_2x/download-button-on-transparent-background-free-png.png" width={45} alt="" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;
