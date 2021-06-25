# Phân tích thiết kế hệ thống Timekeeping

## 1. Đặt vấn đề

## 2. Yêu cầu

- Thêm/sửa/xóa nhân viên.
- Ghi lại giờ vào ra bằng phương pháp nhận diện gương mặt.
- Tính lương theo mỗi ca vào/ra.

## 3. Cơ sở lý thuyết.

### 3.1 Nhận diện gương mặt

### 3.2 Rasberry Pi 3

Raspberry Pi is a series of small single-board computers developed in the United Kingdom by the Raspberry Pi Foundation in association with Broadcom. The Raspberry Pi project originally leaned towards the promotion of teaching basic computer science in schools and in developing countries. The original model became more popular than anticipated, selling outside its target market for uses such as robotics. It is widely used in many areas, such as for weather monitoring, because of its low cost, modularity, and open design. It is typically used by computer and electronic hobbyists, due to its adoption of HDMI and USB devices.

### 3.3 Node.js

As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.


## 4. Cấu trúc hệ thống.

### 4.1 Node.js Web Server

#### 4.1.1 Timekeeping Native App

**Description**

Timekeeping native app phục vụ cho nhân viên. Giúp nhân viên kiểm tra công và lương của mình.

**Contributors**

- Nguyễn Kim Huy: Xây dựng wirefame, thiết kế giao diện. Phát triển, liên kết các pages và components.
- Trần Ngọc Huy: Lựa chọn công nghệ và thiết kế cấu trúc dự án. Sử dụng API và các pages, components để xử lí logic.

**Details**

Câu Nội dung Điểm Ghi chú
1 Giao điện người dung thân thiện 1
2 Di chuyển giữa các màn hình không quá 3 chạm 1
3 Ứng dụng cần có API hoặc Firebase 1
4 Có sử dụng cơ chế cache dữ liệu 1
5 Kiến trúc giải pháp thiết kế hợp lý 1
7
Thiết kế giao diện ứng dụng di động sử dụng:
Sigma/Adobe XD/Photoshop

1
8 Sử dụng hợp lý ứng dụng quản lý dự án: Trello/Jira/... 1
9
Biết cách sử dụng ứng dụng quản lý source code:
Github/Gitlab/Bitbucket

1
10 Hình thức trình bày báo cáo dự án và văn phong đảm
bảo yêu cầu

1

### 4.2 TFace Micro Server

### 4.3 Rasberry Pi 3 Device
