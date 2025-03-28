const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = async (toEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Bem-vindo!',
        text: `Olá, ${userName}! Seu cadastro foi realizado com sucesso.`
    };

    await transporter.sendMail(mailOptions);
};

const sendStatusEmail = async (toEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Cadastro Aprovado - Mapa de Produção Atuns e Afins',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2>Cadastro Aprovado - Mapa de Produção Atuns e Afins</h2>
            <p>Seu cadastro foi aprovado. Seu perfil já está habilitado para <strong>Reportar Produção</strong>. </p>
            <img src="https://pesqbrasil-pescadorprofissional.agro.gov.br/assets/logo-ministerio-pesca.png" alt="Assinatura" style="width: 200px; height: auto;">
        </div>
    `
    };

    await transporter.sendMail(mailOptions);
};

const sendRejectedStatusEmail = async (toEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Cadastro Rejeitado - Mapa de Produção Atuns e Afins',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2>Cadastro Rejeitado - Mapa de Produção Atuns e Afins</h2>
            <p>Seu cadastro foi rejeitado. Atualize seus dados e tente novamente. </p>
            <img src="https://pesqbrasil-pescadorprofissional.agro.gov.br/assets/logo-ministerio-pesca.png" alt="Assinatura" style="width: 200px; height: auto;">
        </div>
    `
    };

    await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (toEmail, tempPassword) => {
    const mailOptions = {
        from: `"Mapa de Produção Atuns e Afins" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Recuperação de Senha - Mapa de Produção Atuns e Afins',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2>Recuperação de Senha - Mapa de Produção Atuns e Afins</h2>
            <p>Sua nova senha temporária é: <strong style="color:rgb(0, 0, 0);">${tempPassword}</strong></p>
            <p>Utilize a senha temporária para fazer login em sua conta e crie uma nova senha na aba <strong>"Gerenciamento de Conta"</strong>.</p>
            <p><strong style="color:rgb(255, 0, 0);">Importante</strong>: para manter a segurança da sua conta, altere sua senha o mais breve possível.</p>
            <img src="https://pesqbrasil-pescadorprofissional.agro.gov.br/assets/logo-ministerio-pesca.png" alt="Assinatura" style="width: 200px; height: auto;">
        </div>
    `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail, sendStatusEmail, sendRejectedStatusEmail };