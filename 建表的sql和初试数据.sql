
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `Course`
-- ----------------------------
DROP TABLE IF EXISTS `Course`;
CREATE TABLE `Course` (
  `CourseId` int(11) NOT NULL AUTO_INCREMENT,
  `CourseName` varchar(255) CHARACTER SET utf8 NOT NULL,
  `Teachername` varchar(255) CHARACTER SET utf8 NOT NULL,
  ` stuobject ` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '2019级计算机专硕',
  `CourseWeek` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '课程学时',
  `CourseDay` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '课程周序',
  `CourseTime` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '课程节次',
  `CoursePlace` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `School` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '福州大学',
  PRIMARY KEY (`CourseId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Course
-- ----------------------------
INSERT INTO `Course` VALUES ('1', '智能技术', '张三立','2018级数学', '1-16', '星期一', '3-4', '东三209', ' 华侨大学');


-- ----------------------------
-- Table structure for `Course_Sign`
-- ----------------------------
DROP TABLE IF EXISTS `Course_Sign`;
CREATE TABLE `Course_Sign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SignId` int(11) NOT NULL,
  `CourseId` int(11) NOT NULL,
  `StudentId` int(11) NOT NULL,
  `longitude` numeric (20,7) NOT NULL,
  `latitude` numeric (20,7) NOT NULL,
  `SignData` varchar(255) DEFAULT NULL,
  `Status` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Course_Sign
-- ----------------------------
INSERT INTO `Course_Sign` VALUES ('47', '4', '3', '119.1964192', '26.0603328', '2020-05-30 15:08:51', '签到');

-- ----------------------------
-- Table structure for `Course_Student`
-- ----------------------------
DROP TABLE IF EXISTS `Course_Student`;
CREATE TABLE `Course_Student` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `CourseId` int(11) NOT NULL,
  `StudentId` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Course_Student
-- ----------------------------
INSERT INTO `Course_Student` VALUES ('1', '1', '2');
INSERT INTO `Course_Student` VALUES ('2', '1', '3');
INSERT INTO `Course_Student` VALUES ('3', '1', '6');
INSERT INTO `Course_Student` VALUES ('4', '2', '2');
INSERT INTO `Course_Student` VALUES ('5', '2', '3');
INSERT INTO `Course_Student` VALUES ('6', '2', '6');
INSERT INTO `Course_Student` VALUES ('7', '3', '2');
INSERT INTO `Course_Student` VALUES ('8', '3', '3');
INSERT INTO `Course_Student` VALUES ('9', '3', '6');
INSERT INTO `Course_Student` VALUES ('10', '4', '2');
INSERT INTO `Course_Student` VALUES ('11', '4', '3');
INSERT INTO `Course_Student` VALUES ('12', '4', '6');
INSERT INTO `Course_Student` VALUES ('13', '1', '10');
INSERT INTO `Course_Student` VALUES ('14', '2', '10');
INSERT INTO `Course_Student` VALUES ('15', '3', '10');
INSERT INTO `Course_Student` VALUES ('16', '4', '10');

-- ----------------------------
-- Table structure for `Dictionary`
-- ----------------------------
DROP TABLE IF EXISTS `Dictionary`;
CREATE TABLE `Dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(16) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Dictionary
-- ----------------------------
INSERT INTO `Dictionary` VALUES ('9', '学历', '无');
INSERT INTO `Dictionary` VALUES ('20', '专业', '各个专业');
INSERT INTO `Dictionary` VALUES ('21', '角色', '主要的角色');
INSERT INTO `Dictionary` VALUES ('22', '课程周序', '星期天数');

-- ----------------------------
-- Table structure for `DictionaryDetail`
-- ----------------------------
DROP TABLE IF EXISTS `DictionaryDetail`;
CREATE TABLE `DictionaryDetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `DictionaryID` int(11) NOT NULL,
  `ItemValue` varchar(32) NOT NULL,
  `position` int(11) NOT NULL,
  `isDefault` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `DictionaryID` (`DictionaryID`),
  CONSTRAINT `DictionaryDetail_ibfk_1` FOREIGN KEY (`DictionaryID`) REFERENCES `Dictionary` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of DictionaryDetail
-- ----------------------------
INSERT INTO `DictionaryDetail` VALUES ('5', '9', '本科', '2', '1');
INSERT INTO `DictionaryDetail` VALUES ('6', '9', '研究生', '3', '0');
INSERT INTO `DictionaryDetail` VALUES ('7', '9', '大专', '1', '0');
INSERT INTO `DictionaryDetail` VALUES ('37', '20', '软件工程', '1', '0');
INSERT INTO `DictionaryDetail` VALUES ('38', '20', '网络工程', '2', '0');
INSERT INTO `DictionaryDetail` VALUES ('39', '20', '信息安全', '3', '0');
INSERT INTO `DictionaryDetail` VALUES ('40', '20', '计算机i技术', '4', '1');
INSERT INTO `DictionaryDetail` VALUES ('41', '21', '管理员', '1', '0');
INSERT INTO `DictionaryDetail` VALUES ('42', '21', '老师', '2', '0');
INSERT INTO `DictionaryDetail` VALUES ('43', '21', '学生', '3', '1');
INSERT INTO `DictionaryDetail` VALUES ('44', '22', '星期一', '1', '1');
INSERT INTO `DictionaryDetail` VALUES ('45', '22', '星期二', '2', '0');
INSERT INTO `DictionaryDetail` VALUES ('46', '22', '星期三', '3', '0');
INSERT INTO `DictionaryDetail` VALUES ('47', '22', '星期四', '4', '0');
INSERT INTO `DictionaryDetail` VALUES ('48', '22', '星期五', '5', '0');
INSERT INTO `DictionaryDetail` VALUES ('49', '22', '星期六', '6', '0');
INSERT INTO `DictionaryDetail` VALUES ('50', '22', '星期日', '7', '0');

-- ----------------------------
-- Table structure for `Menu`
-- ----------------------------
DROP TABLE IF EXISTS `Menu`;
CREATE TABLE `Menu` (
  `Menuid` bigint(20) NOT NULL,
  `Menuname` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `URL` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `roleid` int(10) NOT NULL COMMENT '1为超级管理员所有的',
  PRIMARY KEY (`Menuid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Menu
-- ----------------------------
INSERT INTO `Menu` VALUES ('0', '首页', '/function/', null, '2');
INSERT INTO `Menu` VALUES ('1', '角色管理', '/function/role_manage', '', '1');
INSERT INTO `Menu` VALUES ('2', '学生管理', '/function/use_message_manage', null, '2');
INSERT INTO `Menu` VALUES ('3', '老师管理', '/function/teacher_manage', null, '2');
INSERT INTO `Menu` VALUES ('4', '用户管理', '/function/person_setting', null, '1');
INSERT INTO `Menu` VALUES ('5', '数据字典', '/function/direction/show_dictionary', null, '2');
INSERT INTO `Menu` VALUES ('6', '课程管理', '/function/course_message_manage', null, '2');

-- ----------------------------
-- Table structure for `Right`
-- ----------------------------
DROP TABLE IF EXISTS `Right`;
CREATE TABLE `Right` (
  `Rightid` bigint(20) NOT NULL AUTO_INCREMENT,
  `Rightname` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `Rightdescribe` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `Menuid` bigint(20) NOT NULL,
  PRIMARY KEY (`Rightid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Right
-- ----------------------------
INSERT INTO `Right` VALUES ('1', '新增学生', '新增学生', '2');
INSERT INTO `Right` VALUES ('2', '删除学生', '删除学生', '2');
INSERT INTO `Right` VALUES ('3', '修改学生', '修改学生', '2');
INSERT INTO `Right` VALUES ('4', '查找学生', '查找学生', '2');
INSERT INTO `Right` VALUES ('5', '新增老师', '新增老师', '3');
INSERT INTO `Right` VALUES ('6', '删除老师', '删除老师', '3');
INSERT INTO `Right` VALUES ('7', '修改老师', '修改老师', '3');
INSERT INTO `Right` VALUES ('8', '查找老师', '查找老师', '3');
INSERT INTO `Right` VALUES ('9', '新增用户', '新增用户', '4');
INSERT INTO `Right` VALUES ('10', '删除用户', '删除用户', '4');
INSERT INTO `Right` VALUES ('11', '修改用户', '修改用户', '4');
INSERT INTO `Right` VALUES ('12', '查找用户', '查找用户', '4');
INSERT INTO `Right` VALUES ('13', '新增字典', '新增字典', '5');
INSERT INTO `Right` VALUES ('14', '删除字典', '删除字典', '5');
INSERT INTO `Right` VALUES ('15', '修改字典', '修改字典', '5');
INSERT INTO `Right` VALUES ('16', '查找字典', '查找字典', '5');
INSERT INTO `Right` VALUES ('17', '新增课程', '新增课程', '6');
INSERT INTO `Right` VALUES ('18', '修改课程', '修改课程', '6');
INSERT INTO `Right` VALUES ('19', '查找课程', '查找课程', '6');
INSERT INTO `Right` VALUES ('20', '删除课程', '删除课程', '6');

-- ----------------------------
-- Table structure for `Role`
-- ----------------------------
DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role` (
  `Roleid` bigint(20) NOT NULL AUTO_INCREMENT,
  `Rolename` varchar(64) CHARACTER SET utf8mb4 NOT NULL ,
  `Roledescribe` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `Islock` tinyint(1) NOT NULL COMMENT '状态（禁用）0 禁用 1 可用',
  PRIMARY KEY (`Roleid`) USING BTREE,
  KEY `code` (`Roledescribe`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Role
-- ----------------------------
INSERT INTO `Role` VALUES ('1', '超级管理员', '超级管理员', '1');
INSERT INTO `Role` VALUES ('2', '教师', '教师', '1');
INSERT INTO `Role` VALUES ('3', '学生', '学生', '1');
INSERT INTO `Role` VALUES ('4', '无角色', '待分配权限角色', '0');
INSERT INTO `Role` VALUES ('5', 'test', 'test', '1');
INSERT INTO `Role` VALUES ('19', 'zj100479', '普通管理员', '1');
INSERT INTO `Role` VALUES ('20', 'su', '普通管理员', '1');
INSERT INTO `Role` VALUES ('21', 'test2', 'test2', '0');
INSERT INTO `Role` VALUES ('22', 'test3', 'test3', '1');

-- ----------------------------
-- Table structure for `RoleMeaurelation`
-- ----------------------------
DROP TABLE IF EXISTS `RoleMeaurelation`;
CREATE TABLE `RoleMeaurelation` (
  `Roleid` bigint(20) NOT NULL,
  `Rightid` bigint(20) NOT NULL,
  `id` int(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `rolerightrelation_ibfk_1` (`Roleid`),
  KEY `rolerightrelation_ibfk_2` (`Rightid`),
  CONSTRAINT `rolerightrelation_ibfk_1` FOREIGN KEY (`Roleid`) REFERENCES `Role` (`Roleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rolerightrelation_ibfk_2` FOREIGN KEY (`Rightid`) REFERENCES `Right` (`Rightid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of RoleMeaurelation
-- ----------------------------
INSERT INTO `RoleMeaurelation` VALUES ('20', '2', '41');
INSERT INTO `RoleMeaurelation` VALUES ('20', '5', '42');
INSERT INTO `RoleMeaurelation` VALUES ('20', '8', '43');
INSERT INTO `RoleMeaurelation` VALUES ('20', '10', '44');
INSERT INTO `RoleMeaurelation` VALUES ('21', '3', '97');
INSERT INTO `RoleMeaurelation` VALUES ('21', '7', '98');
INSERT INTO `RoleMeaurelation` VALUES ('21', '11', '99');
INSERT INTO `RoleMeaurelation` VALUES ('22', '1', '103');
INSERT INTO `RoleMeaurelation` VALUES ('22', '5', '104');
INSERT INTO `RoleMeaurelation` VALUES ('19', '2', '116');
INSERT INTO `RoleMeaurelation` VALUES ('19', '4', '117');


-- ----------------------------
-- Table structure for `SignData`
-- ----------------------------
DROP TABLE IF EXISTS `Pos_SignData`;
CREATE TABLE `SignData` (
  `SignId` int(11) NOT NULL AUTO_INCREMENT,
  `CourseId` int(11) NOT NULL,
  ` password ` varchar(255) NOT NULL,
  `StartData` varchar(255) NOT NULL,
  `longitude` numeric (20,7) NOT NULL,
  `latitude` numeric (20,7) NOT NULL,
  PRIMARY KEY (`SignId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of SignData
-- ----------------------------
INSERT INTO `SignData` VALUES ('13', '1', '0','2020-05-29 18:34:21','119.3646622','25.9850721');
INSERT INTO `SignData` VALUES ('14', '1', '123','2020-05-31 11:24:44 ','118.6003623','24.9016524');
-- ----------------------------
-- Table structure for `Student`
-- ----------------------------
DROP TABLE IF EXISTS `Student`;
CREATE TABLE `Student` (
  `Studentid` int(11) NOT NULL AUTO_INCREMENT,
  `Studentname` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `StudentNumber` int(11) NOT NULL,
  `Major` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `Schooling` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `Userid` bigint(20) NOT NULL,
  `Class` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`Studentid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Student
-- ----------------------------
INSERT INTO `Student` VALUES ('2', '李四', '180327043', '数学', '大专', '1', '3');
INSERT INTO `Student` VALUES ('3', '王五', '180327001', '计算机', '研究生', '3', '6');
INSERT INTO `Student` VALUES ('6', '张三', '180327033', '111', 'student', '14', '3');


-- ----------------------------
-- Table structure for `Teacher`
-- ----------------------------
DROP TABLE IF EXISTS `Teacher`;
CREATE TABLE `Teacher` (
  `TeachId` int(11) NOT NULL AUTO_INCREMENT,
  `TeachName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `TeachNumber` int(11) NOT NULL,
  `Userid` bigint(20) NOT NULL,
  PRIMARY KEY (`TeachId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Teacher
-- ----------------------------
INSERT INTO `Teacher` VALUES ('1', '叶东毅', '111', '6');
INSERT INTO `Teacher` VALUES ('2', '池老师', '222', '7');
INSERT INTO `Teacher` VALUES ('3', '廖祥文', '333', '8');

-- ----------------------------
-- Table structure for `User`
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `Userid` bigint(20) NOT NULL AUTO_INCREMENT,
  `Loginname` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '用户名登录使用',
  `tel` bigint(20) NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
  `Roleid` tinyint(1) NOT NULL ,
  PRIMARY KEY (`Userid`) USING BTREE,
  KEY `code` (`Roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO `User` VALUES ('1', 'admin', '15900000001','e10adc3949ba59abbe56e057f20f883e', '1');



DROP TABLE IF EXISTS `OPmenu`;
CREATE TABLE `OPmenu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(16) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

INSERT INTO `OPmenu` VALUES ('1', '人员管理', '具体身份');

-- ----------------------------
-- Records of Dictionary
-- ----------------------------
DROP TABLE IF EXISTS `MenuDetail`;
CREATE TABLE `MenuDetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MenuDetailID` int(11) NOT NULL,
  `ItemValue` varchar(32) NOT NULL,
  `position` int(11) NOT NULL,
  `isDefault` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `MenuDetailID` (`MenuDetailID`),
  CONSTRAINT `MenuDetail_ibfk_1` FOREIGN KEY (`MenuDetailID`) REFERENCES `OPmenu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `MenuDetail` VALUES ('1', '1', '教师管理', '1', '0');