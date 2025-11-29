class ChangePassword {
  constructor(body) {
    this.oldPassword = this.required(body.oldPassword?.trim(), 'oldPassword');
    this.newPassword = this.required(body.newPassword?.trim(), 'newPassword');

    if (this.newPassword.length < 6) {
      throw new Error('Mật khẩu mới phải ít nhất 6 ký tự');
    }
  }

  required(value, field) {
    if (!value) throw new Error(`${field} là bắt buộc`);
    return value;
  }
}

module.exports = ChangePassword;