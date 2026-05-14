const express = require('express');
const router = express.Router();

const db = require('../../database/connection');

router.get('/ping', (req, res) => {
    res.json({ message: 'ping' });
});

router.get('/alunos', async (req, res) => {
    try {
        const alunos = await db('alunos').select('*');

        res.json(alunos);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos'});
    }
});

router.post('/cadastrar-aluno', async (req, res) => { 
    const { nome, idade, numero_chamada } = req.body;

    try {
        const [id] = await db('alunos')
        .insert({ nome, idade, numero_chamada });

        if (!id) {
            return res.status(400).json({ error: 'Erro ao cadastrar aluno'});
        }

        res.status(201)
        .json({message: 'Aluno cadastrado com sucesso',
            id,
            nome,
            idade,
            numero_chamada 
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar alunos'});
    }
})

module.exports = router;