const markdownText = `
# 更新日志

## 24-03-07
1. update 岛屿数据区间参考
2. fix 部分在区间空白的分数会兜底成3只拆分，现改成向下取整

## 24-03-06
1. update 岛屿数据区间参考
2. update 优化睡眠计算交互
3. update 宝可梦食材概率

## 24-03-05
1. add 抽取睡姿-闪光宝可梦
2. add 期望睡姿-显示宝可梦缩略图头像
3. add 期望睡姿-显示期望个数
4. add 期望睡姿-自动换算时分
5. update 期望睡姿-期望计算从3000次->4000次
6. update 优化睡眠计算交互

## 24-03-04
1. update 优化睡眠计算交互

## 24-03-03
1. add 计算期望（睡3000次）
2. add 睡眠计算-切换地图时计算一次睡姿结果
3. update 当前等级解锁睡姿和已解锁睡姿合并成一行
4. update 岛屿数据区间参考

## 24-03-02
1. add 抽取睡姿
2. fix 帮速计算算法有金帮下误差一秒的问题

## 24-02-28
1. add 帮速计算结果允许选择对比宝可梦
2. update 岛屿数据区间参考

## 24-02-27
1. add 一天树果能量排行页面-显示帮忙速度(时分格式)
2. update 一天树果能量排行页面从50级->55级
3. update 视觉样式
4. fix 一天树果能量排行页面-帮忙速度并不是对应等级的问题

## 24-02-26
1. add 食材宝可梦推荐页面显示游戏所有食谱
2. update 一天树果能量排行页面-分页为100个一页
3. update 优化全部食谱列表的pc样式
4. fix 部分不起作用的视觉效果
5. fix 当切换特殊日子加成倍数时，因为只数参数没有重置导致计算结果超过100分的问题

## 24-02-25
1. add 睡眠拆分计算的睡姿显示睡眠类型
2. add 睡眠拆分计算的睡姿按一定顺序排序显示
3. add 睡眠拆分计算的睡姿类型筛选

## 24-02-24
1. add 一天树果能量排行页面-分页

## 24-02-23
1. add 各个岛屿大师10-大师17分数线
2. add 拆睡计算显示对应等级的睡姿&已解锁睡姿
3. add 睡姿数据
4. add 帮速计算帮忙技能限制上限35%(游戏机制：所有帮忙技能加成累积不能超过35%)

## 24-02-21
1. add 全图鉴显示睡眠类型
2. add 最新宝可梦显示睡眠类型

## 24-02-18
1. add 全图鉴显示百分比
2. add 全图鉴食材分类查询关联食谱
3. update 优化性能

## 24-02-17
1. add 帮速计算产出支持60三食材产出
2. add 帮速计算产出支持露营券产出
3. add 帮速计算快速选择25、30、50、60级
4. add 帮速计算可以选择对应食材
5. add 帮速计算结果帮速显示xx分xx秒
6. add 帮速计算结果显示当前等级
7. add 帮速计算结果显示排名位数
8. add 最新宝可梦所有类型新增帮速显示
9. add 全图鉴食材分类查询
10. update 帮速计算等级从10-59级->10-60级
11. fix 帮速计算把等级全部删除导致白屏错误
12. fix 海豹球一家的60食材错误

## 24-02-16
1. add 帮速计算显示能量产出(双食材加食材性格)
2. add 帮速计算新增选项：帮手奖励1-5个、树果S、适正岛屿
3. add 食材推荐显示技能
4. update 视觉样式
5. update 优化性能
6. update 岛屿数据区间参考
7. update 帮速计算等级从30-50级->10-59级

## 24-02-15
1. add 帮速计算从选择帮速改成选择宝可梦
2. add 帮速计算显示能量产出(默认有双帮固执，双食材帮忙，白板+用户)
3. update 帮速计算等级从0-100级->30-50级

## 24-02-12
1. update 最新食材推荐

## 24-02-11
1. add 一天树果能量排行页面-显示一天食材产量

## 24-02-10
1. add 各个岛屿大师7-大师9分数线
2. update 视觉样式
3. update 优化性能

## 24-02-08
1. add v1.2新增的2个菜谱
2. add 点击导航时默认到页面顶部
3. update 一天能量页面视觉样式
4. update 最新食材推荐
5. fix 部分页面出现横向滚动条问题
6. fix 无关紧要的小问题

## 24-02-07
1. add 50级一天树果能量对应岛屿计算
2. add 50级一天食材能量计算
3. update 导航视觉样式

## 24-02-06
1. add 一天树果能量排行页面-

## 24-02-05
1. update 岛屿数据区间参考
2. update 补充全图鉴数据
3. update 帮忙速度计算&食材宝可梦推荐页面视觉样式

## 24-02-04
1. add 帮忙速度计算的对比进度条
2. update 食材宝可梦推荐攻略

## 24-02-02
1. add 帮忙速度计算
2. update 导航视觉样式

## 24-01-31
1. add 捐赠弹窗
2. add 全图鉴技能分类查询
3. add 最新宝可梦因类型不同会显示技能信息

## 24-01-30
1. add 全图鉴树果分类查询
2. update 视觉样式
3. update 岛屿数据区间参考

## 24-01-29
1. add 全图鉴帮忙速度分类查询
2. update 岛屿数据区间参考
3. update 全图鉴帮忙速度

## 24-01-27
1. add 计算睡眠之力的地图选择显示对应树果
2. add 显示对应树果宝可梦
3. add 显示掉活力
4. add 全图鉴页(数据待完善)
5. add 食材宝可梦推荐关联食谱
6. update 岛屿数据区间参考
7. fix 部分情况下最新宝可梦显示正序

## 24-01-26
1. add 5岛计算
2. add 1月最新宝可梦
3. update 岛屿数据区间参考
4. update 最新食材推荐

## 24-01-20
1. update 优化性能

## 24-01-18
1. add 最新宝可梦因类型不同会显示树果、帮忙速度等信息
2. update 视觉样式

## 24-01-12
1. add 食材宝可梦推荐会显示该宝可梦全食材
2. add 最新宝可梦显示类型

## 24-01-03
1. add 导航&分页
2. add 食材宝可梦推荐

## 23-12-25
1. add 满月日2倍、2.5倍、3倍
2. fix 部分情况下最新宝可梦显示正序

## 23-12-20
1. update 视觉样式

## 23-12-19
1. update 最新宝可梦对应图片显示

## 23-12-14
1. add 最新宝可梦记录

## 23-12-12
1. add 网站图标&SEO优化
2. add 距离抓多一只还需多少能量的提示

## 23-12-10
1. add 让睡眠得分更好看
2. update 视觉样式
3. update 页尾信息

## 23-12-05
1. fix 百花雪原的拆分只数计算错误bug
2. fix 某些时候会显示60分钟的bug
3. fix 某些时候会按3只拆分的bug
4. update 视觉样式

## 23-12-04
1. update 按只数拆分功能重新上线
2. update 优化代码

## 23-12-03
1. fix 计算睡眠分错误
2. update 最新的只数数据表
3. update 部分文案
4. update 视觉样式

## 23-12-01
1. update 按只数拆分功能下线

## 23-11-30
1. add 按只数拆分功能
2. update 调整部分文案描述

## 23-11-27
1. add 显示睡眠得分
2. fix 拆分2觉部分计算不正确

## 23-11-26
1. add 特殊日子加成计算

## 23-11-25
1. add 上线

`
export default markdownText