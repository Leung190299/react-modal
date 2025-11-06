# Hướng Dẫn Publish lên NPM

## 📋 Chuẩn bị trước khi publish

### 1. Cập nhật thông tin package.json

Thay đổi các giá trị sau trong `package.json`:

```json
{
  "name": "@your-username/react-modal",  // Thay your-username bằng username NPM của bạn
  "author": "Your Name <your.email@example.com>",  // Thông tin của bạn
  "repository": {
    "url": "https://github.com/your-username/react-modal.git"  // Link GitHub repo
  }
}
```

### 2. Tạo tài khoản NPM (nếu chưa có)

1. Truy cập: https://www.npmjs.com/signup
2. Đăng ký tài khoản
3. Xác thực email

### 3. Login NPM qua terminal

```bash
npm login
```

Nhập:
- Username
- Password
- Email
- OTP (nếu bật 2FA)

## 🚀 Các bước publish

### 1. Build package

```bash
npm run build
```

Kiểm tra thư mục `dist/` đã được tạo và có các file:
- `index.js`
- `index.d.ts`
- Các file khác...

### 2. Test local trước khi publish (Optional)

Tạo link local:
```bash
npm link
```

Trong project khác, test thư viện:
```bash
cd /path/to/test-project
npm link @your-username/react-modal
```

### 3. Kiểm tra package trước khi publish

```bash
npm pack --dry-run
```

Xem những file nào sẽ được publish.

### 4. Publish lên NPM

**Public package (miễn phí):**
```bash
npm publish --access public
```

**Private package (cần trả phí):**
```bash
npm publish
```

### 5. Xác nhận đã publish thành công

Truy cập: `https://www.npmjs.com/package/@your-username/react-modal`

## 📦 Update version mới

Mỗi lần update, cần thay đổi version:

```bash
# Patch (1.0.0 -> 1.0.1) - Bug fixes
npm version patch

# Minor (1.0.0 -> 1.1.0) - New features
npm version minor

# Major (1.0.0 -> 2.0.0) - Breaking changes
npm version major
```

Sau đó publish lại:
```bash
npm run build
npm publish --access public
```

## 🔐 Best Practices

### 1. Sử dụng .npmignore

Tạo file `.npmignore` để loại bỏ file không cần thiết:

```
example/
node_modules/
src/
.git/
.gitignore
tsconfig.json
vite.config.ts
*.log
.DS_Store
```

### 2. Semantic Versioning

- **1.0.0** - First stable release
- **1.0.1** - Bug fixes (patch)
- **1.1.0** - New features (minor)
- **2.0.0** - Breaking changes (major)

### 3. Tạo CHANGELOG.md

Ghi lại thay đổi của từng version:

```markdown
# Changelog

## [1.0.0] - 2025-11-06
### Added
- Initial release
- Web modal with GSAP animations
- React Native modal with Reanimated
- Bottom sheet support
```

## 🏷️ Scoped Package (@username/package)

**Ưu điểm:**
- Tránh trùng tên với package khác
- Có thể tạo nhiều package cùng namespace
- Nhìn chuyên nghiệp hơn

**Lưu ý:** Cần thêm `--access public` khi publish lần đầu

## 🛠️ Unpublish (Xóa package)

⚠️ **Chú ý:** Chỉ có thể unpublish trong vòng 72 giờ sau khi publish

```bash
npm unpublish @your-username/react-modal@1.0.0  # Xóa 1 version
npm unpublish @your-username/react-modal --force # Xóa toàn bộ package
```

## 📊 Theo dõi package

- **NPM Stats**: https://npm-stat.com/
- **Bundlephobia**: https://bundlephobia.com/
- **NPM Dashboard**: https://www.npmjs.com/~your-username

## 🐛 Troubleshooting

### Lỗi 403 (Forbidden)

```bash
npm logout
npm login
npm publish --access public
```

### Lỗi "Package name too similar"

Đổi tên package trong `package.json`

### Lỗi "You must verify your email"

Kiểm tra email và xác thực tài khoản NPM

## ✅ Checklist trước khi publish

- [ ] Đã update `package.json` với thông tin đúng
- [ ] Đã tạo file `README.md` đầy đủ
- [ ] Đã tạo file `LICENSE`
- [ ] Đã build thành công (`npm run build`)
- [ ] Đã test thư viện hoạt động đúng
- [ ] Đã login NPM (`npm login`)
- [ ] Version number hợp lý
- [ ] Đã commit code lên Git (nếu có)

## 🎉 Sau khi publish thành công

1. Tag version trên Git:
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. Tạo GitHub Release (nếu có repo)

3. Share lên social media, dev communities

4. Cập nhật documentation nếu cần

---

**Lưu ý:** Sau khi publish, mọi người có thể cài đặt bằng:

```bash
npm install @your-username/react-modal
```
