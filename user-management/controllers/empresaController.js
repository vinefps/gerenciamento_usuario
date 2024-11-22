const Empresa = require("../models/Empresa");
const PessoaJuridica = require("../models/PessoaJuridica");

// Criar uma nova empresa
const createEmpresa = async (req, res) => {
    try {
        const empresa = new Empresa(req.body);
        const savedEmpresa = await empresa.save();
        res.status(201).json(savedEmpresa);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Listar todas as empresas
const getAllEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find().populate("pessoaFisicas pessoaJuridicas");
        res.status(200).json(empresas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const associatePessoaJuridicaToEmpresa = async (req, res) => {
    try {
        const { pessoaJuridicaId, empresaId } = req.body;

        // Busca a empresa e a pessoa jurídica no banco de dados
        const empresa = await Empresa.findById(empresaId);
        const pessoaJuridica = await PessoaJuridica.findById(pessoaJuridicaId);

        // Verifica se ambos existem
        if (!empresa || !pessoaJuridica) {
            return res.status(404).json({ message: "Empresa ou Pessoa Jurídica não encontrada" });
        }

        // Adiciona a Pessoa Jurídica na lista de pessoas jurídicas da empresa
        empresa.pessoaJuridicas.push(pessoaJuridica._id);
        await empresa.save();

        res.status(200).json({ message: "Pessoa Jurídica associada à empresa com sucesso!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createEmpresa,
    getAllEmpresas,
    associatePessoaJuridicaToEmpresa
};


