# React Modal Demo

Demo app để test modal component

## Chạy demo Web

```bash
npm run dev
```

Mở trình duyệt tại: http://localhost:3000

## Demo bao gồm:

### Web (App.web.tsx)
- **Centered Modal**: Modal xuất hiện giữa màn hình với hiệu ứng scale và bounce
- **Bottom Sheet**: Modal trượt lên từ dưới lên
- **Custom Styled Modal**: Modal với style tùy chỉnh (overlay màu hồng, content gradient)

### Mobile (App.mobile.tsx)
- **Centered Modal**: Modal với animation scale và spring effect
- **Bottom Sheet**: Slide up từ dưới với react-native-reanimated
- **Custom Styled Modal**: Modal với custom colors

## Tính năng test:

✅ Open/close animations với GSAP (web) và Reanimated (mobile)
✅ Click outside để đóng modal
✅ Close button (có thể tắt với isButtonClose={false})
✅ Custom styling (className cho web, StyleProp cho mobile)
✅ Modal types: 'modal' hoặc 'bottomSheet'
✅ onClose và onDone callbacks
