const Joi = require('joi');

//

const userScheme = Joi.object({
    nome: Joi.string().min(1).required(),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'A senha é obrigatória',
        'string.min': 'A senha deve ter pelo menos {{#limit}} caracteres',
        'any.required': 'A senha é obrigatória',
    }),
    email: Joi.string().email().required(),
    cnpj: Joi.string().min(14).required(),
    tipo: Joi.string().valid('admin', 'comum').required(),
    status: Joi.string().valid('aprovado', 'pendente', 'rejeitado').required(),
    rgp: Joi.string().min(10).required(),
    cep: Joi.string().min(8).required(),
    complemento: Joi.string().min(1).required(),
    refreshtoken: Joi.string(),
});

const validateUser = (req, res, next) => {
    const { error } = userScheme.validate(req.body);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    next();
};

const userSchemeNoPassword = Joi.object({
    nome: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    cnpj: Joi.string().min(14).required(),
    status: Joi.string().valid('aprovado', 'pendente', 'rejeitado').required(),
    rgp: Joi.string().min(10).required(),
    cep: Joi.string().min(8).required(),
    complemento: Joi.string().min(1).required(),
});

const validateUserNoPassWord = (req, res, next) => {
    const { error } = userSchemeNoPassword.validate(req.body);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    next();
};

const updateTypeScheme = Joi.object({
    tipo: Joi.string().valid('admin', 'comum').required(),
});


const validateUpdateTypeScheme = (req, res, next) => {
    const { error } = updateTypeScheme.validate(req.body);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    next();
};

const updateStatusScheme = Joi.object({
    status: Joi.string().valid('aprovado', 'pendente', 'rejeitado').required(),
});

const validateUpdateStatusScheme = (req, res, next) => {
    const { error } = updateStatusScheme.validate(req.body);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    next();
};

// embarcação


const embarcacaoScheme = Joi.object({
    nome: Joi.string().min(1).required(),
    rgp: Joi.string().min(10).required(),
});

const validateEmbarcacaoScheme = (req, res, next) => {
    const { error } = embarcacaoScheme.validate(req.body);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    next();
};

// ProducaoEmbarcacaoEspecie

const producaoEmbarcacaoEspecieScheme = Joi.object({
    producaoId: Joi.number().integer().required(),
    embarcacaoId: Joi.number().integer().required(),
    especieId: Joi.number().integer().required(),
    peso: Joi.number().required().messages({
        'number.base': 'Peso: insira apenas caracteres numéricos',
    }),
});

const validateProducaoEmbarcacaoEspecie = (req, res, next) => {
    const { error } = producaoEmbarcacaoEspecieScheme.validate(req.body);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    next();
};

module.exports = { validateUser, validateUserNoPassWord, validateUpdateTypeScheme, validateUpdateStatusScheme, validateEmbarcacaoScheme, validateProducaoEmbarcacaoEspecie };