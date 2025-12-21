# 成绩管理模块（新增功能）

本模块是我在原学生管理系统框架基础上添加的第一个完整功能，实现了学生成绩的增删改查以及基本统计，覆盖了从实体到前端页面的全栈开发流程。

## 功能概述
- 支持按学生、科目查询成绩
- 新增、编辑、删除成绩记录
- 计算并显示平均分、最高分
- 分页展示成绩列表

## 开发过程（按顺序记录）

### 1. 实体层（Entity）
- 新增 `Score.java` 实体类
- 字段包括：id、studentId、subject、score、examDate 等
- 使用 Lombok 注解（@Data、@Entity 等）
- 与 Student 实体关联（多对一）

### 2. 数据库表
- 在 sql 文件夹新增/修改 `score.sql`
- 创建 score 表：
  ```sql
  CREATE TABLE score (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    subject VARCHAR(50),
    score DECIMAL(5,2),
    exam_date DATE,
    FOREIGN KEY (student_id) REFERENCES student(id)
  );