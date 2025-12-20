package com.example.springboot.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.springboot.service.INoticeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.example.springboot.common.Result;
import com.example.springboot.entity.Notice;

import org.springframework.web.bind.annotation.RestController;

/**
* NoticeAPI接口
*/
@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private INoticeService noticeService;

    /**
     * 新增
     */
    @PostMapping
    public Result save(@RequestBody Notice notice) {
        noticeService.save(notice);
        return Result.success();
    }

    /**
     * 修改
     */
    @PutMapping
    public Result update(@RequestBody Notice notice) {
        noticeService.updateById(notice);
        return Result.success();
    }

    /**
     * 删除
     */
    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        noticeService.removeById(id);
        return Result.success();
    }

    /**
     * 查询全部数据
     */
    @GetMapping
    public Result findAll() {
        return Result.success(noticeService.list());
    }

    /**
     * 查询详情
     */
    @GetMapping("/{id}")
    public Result findOne(@PathVariable Integer id) {
        return Result.success(noticeService.getById(id));
    }

    /**
     * 分页查询数据
     */
    @GetMapping("/page")
    public Result findPage(@RequestParam(defaultValue = "") String name,
                           @RequestParam Integer pageNum,
                           @RequestParam Integer pageSize) {
        LambdaQueryWrapper<Notice> queryWrapper = new LambdaQueryWrapper<Notice>().orderByDesc(Notice::getId);
        queryWrapper.like(StrUtil.isNotBlank(name), Notice::getName, name);
        Page<Notice> page = noticeService.page(new Page<>(pageNum, pageSize), queryWrapper);
        return Result.success(page);
    }

}
