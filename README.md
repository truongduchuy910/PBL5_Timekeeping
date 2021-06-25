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

**Overview**

|      | Description                                 | status |                                                                              note |
| :--- | ------------------------------------------- | ------ | --------------------------------------------------------------------------------: |
| 1    | UI/UX design                                | ✅     |                                                                                   |
| 2    | Di chuyển giữa các màn hình không qu 3 chạm | ✅     |                                                                                   |
| 3    | Ứng dụng cần có API hoặc Firebase           | ✅     |                                                          TFace Micro, Timekeeping |
| 4    | Có sử dụng cơ chế cache dữ liệu             | ✅     |                                                                                   |
| 5    | Kiến trúc giải pháp thiết kế hợp lý         | ❔     |                                                                                   |
| 7    | Sigma/Adobe XD/Photoshop                    | ✅     |                                                                  timkeeping_xd.xd |
| 8    | Trello/Jira/...                             | ❌     |                                                                                   |
| 9    | Github/Gitlab/Bitbucket                     | ✅     | [timekeeping](https://github.com/truongduchuy910/timekeeping/blob/main/README.md) |
| 10   | Báo cáo dự án và văn phong đảm bảo yêu cầu  | ❔     |                                                                                   |

**Details**

##### UI/UX design

Dựa trên Adobe XD, timekeeping phát triển các components. Sử dụng css inline và không phụ thuộc UI library. Có phụ sử dụng thư viện date time picker.

##### Di chuyển giữa các màn hình không quá 3 chạm

Vì số trang không quá nhiều, nên khi thiết kế wireframe. Timekeeping đã lược bỏ menu điều hướng dọc. Thay vào đó khi di chuyển sang trang khác. Người dùng nhấn trở lại và chọn trang cần đến.

##### Ứng dụng cần có API hoặc Firebase

Timekeeping sử dụng GraphQL API tự phát triển tại https://timekeeping.itoa.vn/admin/api

##### Có sử dụng cơ chế cache dữ liệu   

Tham khảo: [InMemoryCache](https://www.apollographql.com/docs/react/api/cache/InMemoryCache/)

Cơ chế cache dựa trên truy vấn và tham số. Nếu cùng một truy vấn, cùng tham số đó gọi lần thứ 2 trở đi sẽ được trả về kết quả trong cache.

Cache s

##### Kiến trúc giải pháp thiết kế hợp lý   
##### Sigma/Adobe XD/Photoshop
##### Trello/Jira/...   
##### Github/Gitlab/Bitbucket
##### Báo cáo dự án và văn phong đảm bảo yêu cầu 

### 4.2 TFace Micro Server

### 4.3 Rasberry Pi 3 Device
