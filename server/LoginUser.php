<?php
//打印数据库信息成为一个表格，然后点击表格可以修改表格信息并且传入到数据库，
//数据库接收后更新数据库并且跳转到b.php 重新绘制表格
header("Content-type: text/html; charset=utf-8");
// header("Content-type:application/json");

$user = $_POST["username"];//获取表单POST过来的用户名
$psw = $_POST["password"];//获取表单POST过来的密码

 

if($user == "" && $psw == ""){
  echo "<script>alert('请输入用户名密码');history.back();</script>";
  return;
}else if ($user == "") {
  echo "<script>alert('输入的用户名不可为空');history.back();</script>";
  return;
}else if ($psw == "") {
  echo "<script>alert('输入的密码不可为空');history.back();</script>";
    return;

}else{
  link_sql($user,$psw);
}


function link_sql($user,$psw){
   $sql=mysqli_connect("localhost","root","root","bk-2004",3306);
   if(mysqli_connect_error()){
        echo"服务器异常 请稍后访问";
        return;
    }
    // var_dump($sql);
    select_user($sql,$user,$psw);
  // inserData($sql);
} 

function select_user($sql,$user,$psw){
  $res=mysqli_query($sql,"SELECT * FROM `users` WHERE user='$user' AND password='$psw'");
  $res_result=mysqli_num_rows($res);
  if(!$res_result){
    echo "<script>alert('输入的用户名有误');history.back();</script>";
    return; 
}else{
  setcookie('nickname',$user,time()+3600,"/");
  echo "<script> window.location.href='../indexs.html' </script>";
}
}



?>