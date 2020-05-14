/*==============================================================*/
/* DBMS name:      Sybase SQL Anywhere 12                       */
/* Created on:     2020/3/27 17:04:43                           */
/*==============================================================*/


if exists(select 1 from sys.sysforeignkey where role='FK_COURSE_REFERENCE_TEACHER') then
    alter table course
       delete foreign key FK_COURSE_REFERENCE_TEACHER
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_COURSE-S_REFERENCE_COURSE') then
    alter table "course-Student"
       delete foreign key "FK_COURSE-S_REFERENCE_COURSE"
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_COURSE-S_REFERENCE_STUDENT') then
    alter table "course-Student"
       delete foreign key "FK_COURSE-S_REFERENCE_STUDENT"
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_DICTIONA_REFERENCE_DICTIONA') then
    alter table dictionaryDetail
       delete foreign key FK_DICTIONA_REFERENCE_DICTIONA
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_MENU_REFERENCE_ROLE') then
    alter table menu
       delete foreign key FK_MENU_REFERENCE_ROLE
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_RIGHT_REFERENCE_MENU') then
    alter table "right"
       delete foreign key FK_RIGHT_REFERENCE_MENU
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_ROLEMEAU_REFERENCE_RIGHT') then
    alter table roleMeaurelation
       delete foreign key FK_ROLEMEAU_REFERENCE_RIGHT
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_ROLEMEAU_REFERENCE_ROLE') then
    alter table roleMeaurelation
       delete foreign key FK_ROLEMEAU_REFERENCE_ROLE
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_STUDENT_REFERENCE_USER') then
    alter table student
       delete foreign key FK_STUDENT_REFERENCE_USER
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_TEACHER_REFERENCE_USER') then
    alter table teacher
       delete foreign key FK_TEACHER_REFERENCE_USER
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_USER_REFERENCE_ROLE') then
    alter table "user"
       delete foreign key FK_USER_REFERENCE_ROLE
end if;

drop table if exists course;

drop table if exists "course-Student";

drop table if exists dictionary;

drop table if exists dictionaryDetail;

drop table if exists menu;

drop table if exists "right";

drop table if exists role;

drop table if exists roleMeaurelation;

drop table if exists student;

drop table if exists teacher;

drop table if exists "user";

/*==============================================================*/
/* Table: course                                                */
/*==============================================================*/
create table course 
(
   courseId             varchar                        not null,
   courseName           varchar                        not null,
   teacherId            varchar                        not null,
   school               char(10)                       not null,
   term                 varchar                        not null,
   coursePlace          varchar                        not null,
   courseTime           varchar                        not null,
   courseObj            varchar                        not null,
   startWeek            int                            not null,
   endWeek              int                            not null,
   creater              varchar(20)                    not null,
   createDate           time                           not null,
   constraint PK_COURSE primary key clustered (courseId)
);

/*==============================================================*/
/* Table: "course-Student"                                      */
/*==============================================================*/
create table "course-Student" 
(
   id                   varchar                        not null,
   courseId             varchar                        not null,
   studentId            varchar                        not null,
   constraint "PK_COURSE-STUDENT" primary key clustered (id)
);

/*==============================================================*/
/* Table: dictionary                                            */
/*==============================================================*/
create table dictionary 
(
   dictionaryId         varchar                        not null,
   dictionaryCode       varchar(20)                    not null,
   dictionaryDescribe   varchar(30)                    not null,
   creater              varchar(20)                    not null,
   createDate           time                           not null,
   constraint PK_DICTIONARY primary key clustered (dictionaryId)
);

/*==============================================================*/
/* Table: dictionaryDetail                                      */
/*==============================================================*/
create table dictionaryDetail 
(
   dictionaryDetailId   varchar                        not null,
   dictionaryId         varchar                        not null,
   itemValue            varchar                        not null,
   position             int                            not null,
   isDefault            int                            not null,
   constraint PK_DICTIONARYDETAIL primary key clustered (dictionaryDetailId)
);

/*==============================================================*/
/* Table: menu                                                  */
/*==============================================================*/
create table menu 
(
   menuId               varchar                        not null,
   menuName             varchar                        not null,
   roleId               varchar                        not null,
   URL                  varchar                        not null,
   icon                 varchar                        not null,
   isVisible            int                            not null,
   isPage               int                            not null,
   constraint PK_MENU primary key clustered (menuId)
);

/*==============================================================*/
/* Table: "right"                                               */
/*==============================================================*/
create table "right" 
(
   rightId              varchar                        not null,
   rightName            varchar(30)                    not null,
   rightDescribe        varchar(30)                    not null,
   menuId               varchar                        not null,
   creater              varchar(20)                    not null,
   createDate           time                           not null,
   constraint PK_RIGHT primary key clustered (rightId)
);

/*==============================================================*/
/* Table: role                                                  */
/*==============================================================*/
create table role 
(
   roleId               varchar                        not null,
   roleName             varchar(20)                    not null,
   roleDes              varchar(20)                    null,
   roelState            smallint                       not null,
   constraint PK_ROLE primary key clustered (roleId)
);

/*==============================================================*/
/* Table: roleMeaurelation                                      */
/*==============================================================*/
create table roleMeaurelation 
(
   roleId               varchar                        not null,
   rightId              varchar                        not null,
   roleMeaureId         varchar                        not null,
   constraint PK_ROLEMEAURELATION primary key clustered (roleMeaureId)
);

/*==============================================================*/
/* Table: student                                               */
/*==============================================================*/
create table student 
(
   studentId            varchar                        not null,
   studentName          varchar(20)                    not null,
   studentCode          varchar                        not null,
   major                varchar(20)                    not null,
   userSchool           varchar(20)                    not null,
   userId               varchar                        not null,
   studentClass         varchar(20)                    not null,
   creater              varchar(20)                    not null,
   createDate           time                           not null,
   constraint PK_STUDENT primary key clustered (studentId)
);

/*==============================================================*/
/* Table: teacher                                               */
/*==============================================================*/
create table teacher 
(
   teacherId            varchar                        not null,
   teacherName          varchar                        not null,
   teacherCode          varchar                        not null,
   userId               varchar                        not null,
   creater              varchar(20)                    not null,
   createDate           time                           not null,
   constraint PK_TEACHER primary key clustered (teacherId)
);

/*==============================================================*/
/* Table: "user"                                                */
/*==============================================================*/
create table "user" 
(
   userId               varchar                        not null,
   userName             varchar                        not null,
   userPassward         varchar                        not null,
   roleId               varchar                        not null,
   constraint PK_USER primary key clustered (userId)
);

alter table course
   add constraint FK_COURSE_REFERENCE_TEACHER foreign key (teacherId)
      references teacher (teacherId)
      on update restrict
      on delete restrict;

alter table "course-Student"
   add constraint "FK_COURSE-S_REFERENCE_COURSE" foreign key (courseId)
      references course (courseId)
      on update restrict
      on delete restrict;

alter table "course-Student"
   add constraint "FK_COURSE-S_REFERENCE_STUDENT" foreign key (studentId)
      references student (studentId)
      on update restrict
      on delete restrict;

alter table dictionaryDetail
   add constraint FK_DICTIONA_REFERENCE_DICTIONA foreign key (dictionaryId)
      references dictionary (dictionaryId)
      on update restrict
      on delete restrict;

alter table menu
   add constraint FK_MENU_REFERENCE_ROLE foreign key (roleId)
      references role (roleId)
      on update restrict
      on delete restrict;

alter table "right"
   add constraint FK_RIGHT_REFERENCE_MENU foreign key (menuId)
      references menu (menuId)
      on update restrict
      on delete restrict;

alter table roleMeaurelation
   add constraint FK_ROLEMEAU_REFERENCE_RIGHT foreign key (rightId)
      references "right" (rightId)
      on update restrict
      on delete restrict;

alter table roleMeaurelation
   add constraint FK_ROLEMEAU_REFERENCE_ROLE foreign key (roleId)
      references role (roleId)
      on update restrict
      on delete restrict;

alter table student
   add constraint FK_STUDENT_REFERENCE_USER foreign key (userId)
      references "user" (userId)
      on update restrict
      on delete restrict;

alter table teacher
   add constraint FK_TEACHER_REFERENCE_USER foreign key (userId)
      references "user" (userId)
      on update restrict
      on delete restrict;

alter table "user"
   add constraint FK_USER_REFERENCE_ROLE foreign key (roleId)
      references role (roleId)
      on update restrict
      on delete restrict;

