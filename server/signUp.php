<?php
header("content-type:text/html;charset=utf-8");
link_sql();
function link_sql()
{
    $sql = mysqli_connect("localhost", "root", "root", "bk-2004", 3306);
    if (mysqli_connect_errno()) {
        echo "服务器异常，请稍后访问";
        return;
    }
    insertData($sql);
}

function insertData($sql)
{
    $res = mysqli_query($sql, "INSERT INTO `users`(`user`, `password`, `name`, `age`, `sex`, `tel`, `email`) VALUES ('$_POST[user]','$_POST[password]','$_POST[name]',$_POST[age],'$_POST[sex]','$_POST[tel]','$_POST[email]')");

    if (!$res) {
        echo "<script>alert('输入的用户名有误');history.back();</script>";
        return;
    }
    echo "<script> window.location.href='http://10.9.25.133:4001/signIn.html'; </script>";
}
