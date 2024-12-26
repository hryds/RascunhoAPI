const User = require('../models/user');

// CRUD Controllers

//get all users
exports.getUsers = (req, res, next) => {
    User.findAll() //select * from users
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

//get user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) { 
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

//create user
exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const cnpj = req.body.cnpj;
  const tipo = req.body.tipo;
  const status = req.body.status;
  const rgp = req.body.rgp;
  const cep = req.body.cep;
  const uf = req.body.uf;

  User.create({
    name: name,
    email: email,
    cnpj: cnpj,
    tipo: tipo,
    status: status,
    rgp: rgp,
    cep: cep,
    uf: uf

  })
    .then(result => {
      console.log('Created User');
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

//update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedCnpj = req.body.cnpj;
  const updatedTipo = req.body.tipo;
  const updatedStatus = req.body.status;
  const updatedRgp = req.body.rgp;
  const updatedCep = req.body.cep;
  const updatedUf = req.body.uf;

  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      user.name = updatedName;
      user.email = updatedEmail;
      user.cnpj = updatedCnpj;
      user.tipo = updatedTipo;
      user.status = updatedStatus;
      user.rgp = updatedRgp;
      user.cep = updatedCep;
      user.uf = updatedUf;
      return user.save();
    })
    .then(result => {
      res.status(200).json({message: 'User updated!', user: result});
    })
    .catch(err => console.log(err));
}

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => console.log(err));
}