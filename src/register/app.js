const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Định nghĩa Schema cho người dùng
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Tạo model từ Schema
const UserModel = mongoose.model('User', userSchema);

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình body-parser để nhận dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Định tuyến cho trang đăng ký
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// Xử lý dữ liệu đăng ký
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Kiểm tra xem tên đăng nhập hoặc email đã tồn tại trong cơ sở dữ liệu
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            // Nếu tên đăng nhập hoặc email đã tồn tại, gửi thông báo lỗi cho người dùng
         // Thay vì:
// return res.send('Tên đăng nhập hoặc email đã tồn tại trong hệ thống. Vui lòng chọn tên đăng nhập hoặc email khác.');

// Bạn có thể trả về mã JavaScript như sau:
            return res.send("<script>alert('Tên đăng nhập hoặc email đã tồn tại trong hệ thống. Vui lòng chọn tên đăng nhập hoặc email khác.');</script>");

            res.redirect('/register');
        }

        // Nếu không tìm thấy tên đăng nhập hoặc email tương tự, tiếp tục tạo người dùng mới trong cơ sở dữ liệu
        const newUser = new UserModel({
            username,
            email,
            password
        });

        // Lưu người dùng mới vào cơ sở dữ liệu
        await newUser.save();

        // Nếu đăng ký thành công, chuyển hướng người dùng đến trang đăng nhập hoặc trang khác tùy thuộc vào yêu cầu
        // Ví dụ: res.redirect('/login');
        
        // Gửi thông báo cho người dùng rằng đăng ký thành công
        res.redirect('/login');
    } catch (error) {
        res.status(400).send('Đăng ký thất bại: ' + error);
    }
});




// Định tuyến cho trang đăng nhập
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
const customerSchema = new mongoose.Schema({
    username: String,
    phone: String,
    address: String
});

// Tạo model từ Schema
const CustomerModel = mongoose.model('Customer', customerSchema);
app.post('/submit', async (req, res) => {
    const { username, phone, address } = req.body;

    try {
        // Tạo một bản ghi mới trong cơ sở dữ liệu cho thông tin khách hàng
        const newCustomer = new CustomerModel({
            username,
            phone,
            address
        });

        // Lưu thông tin khách hàng vào cơ sở dữ liệu
        await newCustomer.save();

        // Gửi thông báo cho người dùng rằng thông tin đã được lưu thành công
        return res.send('Thông tin khách hàng đã được lưu thành công!');
    } catch (error) {
        res.status(400).send('Lỗi khi lưu thông tin khách hàng: ' + error);
    }
});
// Route xử lý việc đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    UserModel.findOne({ username, password })
        .then(user => {
            if (user) {
                // Nếu đăng nhập thành công, điều hướng sang trang index.html
                res.redirect('/index');
            } else {
                res.send('Tên đăng nhập hoặc mật khẩu không chính xác!');
            }
        })
        .catch(error => {
            res.status(400).send('Đăng nhập thất bại: ' + error);
        });
});
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Khởi động máy chủ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
