# Day1：环境搭建与成功运行原项目（2025-12-22）

今天正式开始学生管理系统的二次开发学习之旅！目标是通过在现有框架基础上添加新功能，掌握全栈开发技能。

## 1. 项目来源
- 从Bilibili上找到一个开源的学生管理系统项目（Vue 前端 + Spring Boot 后端 + MySQL）
- 项目结构：前后端分离
    - 前端：Vue 2 + Element UI
    - 后端：Spring Boot + MyBatis + MySQL

## 2. 环境准备
- JDK 8（或项目要求的版本）
- Node.js 14+（用于前端）
- MySQL 5.7 或 8.0
- IntelliJ IDEA（后端开发）
- VS Code 或 IDEA 自带前端工具（前端开发）
- Maven（后端依赖管理）

## 3. 搭建步骤
1. 将项目代码克隆/复制到本地
2. 导入数据库
    - 找到项目中的 `sql` 文件夹（通常有 student.sql、init.sql 等）
    - 在 MySQL 中新建数据库 `student_grades`（编码 utf8mb4）
    - 运用了Navicat Premium 17 来导入数据库
3. 配置后端
    - 打开 `src/main/resources/application.yml`（或 application.properties）
      - 修改数据库连接信息：
        ```yaml
        spring:
        datasource:
            url: jdbc:mysql://localhost:3306/student_grades?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
            username: root
            password: 3.14