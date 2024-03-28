const mongoose = require('mongoose');

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Định nghĩa Schema
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    stt: Number,
    username: String,
    password: String
});

// Tạo model từ Schema
const AccountModel = mongoose.model('Account', accountSchema);

// Tạo một bản ghi mới
const newAccount = new AccountModel({
    stt: 1,
    username: 'example_username',
    password: 'example_password'
});

// Lưu bản ghi vào cơ sở dữ liệu
newAccount.save()
    .then(() => {
        console.log('Dữ liệu đã được thêm thành công.');
    })
    .catch((error) => {
        console.error('Lỗi khi thêm dữ liệu:', error);
    });
