$(() => [

    $('.btn').click(function () {
        //获取输入的用户名和密码
        let userName = $('#inputEmail3').val().trim();
        let pas = $('#inputPassword3').val();
        let auto = $('checkbox1').prop('checked');
        if (userName && pas) {
            $.ajax({
                type: 'POST',
                url: '/login/signin',
                data: `name=${userName}&password=${pas}&auto=${auto}`
            }).done(data => {
                if (data.code == 1) {
                    location.href = '/index.html';
                }
            })
        } else {
            alert('请输入用户名和密码');
        }

    })

])