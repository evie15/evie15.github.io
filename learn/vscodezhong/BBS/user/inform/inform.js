window.onload=function(){

    var token=localStorage.getItem('token');
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://43.140.247.80:8080/inform/comment/1');
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res=JSON.parse(xhr.responseText);
            console.log(res);
            if(token!==null){
                var navi=`<ul>
                <li><a href="../loginhome/login.html"><button id="chosed">BBS</button></a>  </li>
                <li> </li>
                <li></li>
                <li></li>
                <li><a href="../inform/infrom.html"><button> <span class="glyphicon glyphicon-bell"></span><span class="font">消 息</span> </button></a>  </li>
                <li><a href="../publish posts/pub_post.html"><button><span class="glyphicon glyphicon-edit"></span> <span class="font">创作中心</span>  </button></a>
                </li>
                <li>
                <a href="../personal/person.html">
                <div class="user_ph" onclick="Show()"><img src="${res.data.idPhoto}" alt="">
                          <span class="login" s>${res.data.nickName}</span>
                       </div>
                </a>      
                       <span class="outlogin" onclick="out()">退出登陆</span>
                </li>
            </ul>`
            document.getElementsByClassName('navi')[0].innerHTML=navi;
            }
            addComment('1');
            document.getElementById('comment').onclick=function(){
                addComment('1');
            }
            document.getElementById('follow').onclick=function(){
                addFollow('1');
            }
            document.getElementById('system').onclick=function(){
                addSystem('1');
            }
        }
    }
    xhr.send();
}
function addComment(index){
    var token=localStorage.getItem('token');
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://43.140.247.80:8080/inform/comment/'+index);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res1=JSON.parse(xhr.responseText);
            var res2=res1.data.page.list;
            document.getElementsByClassName('comment')[0].innerHTML=''
    for(let i=0;i<`${res2.length}`;i++){
        var body=`${res2[i].body}`;
        var user1=body.split('：');
        if(`${res2[i].confirmStatus}`==0){
            var html1=`<div class="person_post">
            <span class="glyphicon glyphicon-info-sign"></span>
    <div class="post_title">${res2[i].date} <span class="glyphicon glyphicon-trash" onclick="deleteComment(this,${res2[i].id},'comment',${index})"></span></div>
    <div class="post_content"><span class="fans">${user1[0]}</span>${user1[1]}---${user1[2]}</div>
    <span style="curse:default;" onclick="turnPage(${res2[i].postsId})">查看详情</span>
</div>`
        }
        else{
            var html1=`
            <div class="person_post">
    <div class="post_title">${res2[i].date} <span class="glyphicon glyphicon-trash" onclick="deleteComment(this,${res2[i].id},'comment',${index})"></span></div>
    <div class="post_content"><span class="fans">${user1[0]}</span>${user1[1]}---${user1[2]}</div>
    <span style="cursor: default;" onclick="turnPage(${res2[i].postsId})">查看详情</span>
</div>`
        }
        document.getElementsByClassName('comment')[0].innerHTML+=html1;
    }
    var defalutPager={
        currentPage:1,
        pageSize:8,
        divNumber:1,
        total:0,
        pageNumber:0,
        }
        var pager=Object.assign(defalutPager,pager);
    createPager(pager,res1.data);
    addnumber1(pager);
    blidEvent(pager);
}}
    
}
function turnPage(num){
    console.log(num)
    url="../show posts/post.html?id="+num;
    window.location.href=url;
}
function addFollow(index){
    var token=localStorage.getItem('token');
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://43.140.247.80:8080/inform/follow/'+index);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res1=JSON.parse(xhr.responseText);
            var res2=res1.data.page.list;
            document.getElementsByClassName('follow')[0].innerHTML=''
    for(let i=0;i<`${res2.length}`;i++){
        var body=`${res2[i].body}`;
        var user1=body.split('：');
        if(`${res2[i].confirmStatus}`==0){
            var html1=`<div class="person_post">
            <span class="glyphicon glyphicon-info-sign"></span>
    <div class="post_title">${res2[i].date} <span class="glyphicon glyphicon-trash" onclick="deleteComment(this,${res2[i].id},'follow',${index})"></span></div>
    <div class="post_content"><span class="fans">${user1[0]}</span>${user1[1]}</div>
</div>`
        }
        else{
            var html1=`
            <div class="person_post">
    <div class="post_title">${res2[i].date} <span class="glyphicon glyphicon-trash" onclick="deleteComment(this,${res2[i].id},'follow',${index})"></span></div>
    <div class="post_content"><span class="fans">${user1[0]}</span>${user1[1]}</div>   
</div>`
        }
        document.getElementsByClassName('follow')[0].innerHTML+=html1;
    var defalutPager={
    currentPage:1,
    pageSize:8,
    divNumber:1,
    total:0,
    pageNumber:0,
    }
    var pager=Object.assign(defalutPager,pager);
createPager(pager,res1.data);
addnumber2(pager);
blidEvent(pager);
    }
}}

}
function addSystem(index){
    var token=localStorage.getItem('token');
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://43.140.247.80:8080/inform/system/'+index);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res1=JSON.parse(xhr.responseText);
            var res2=res1.data.page.list;
            document.getElementsByClassName('system')[0].innerHTML=''
    for(let i=0;i<`${res2.length}`;i++){
        var body=`${res2[i].body}`;
        var user1=body.split('：');
        if(`${res2[i].confirmStatus}`==0){
            var html1=`<div class="person_post">
            <span class="glyphicon glyphicon-info-sign"></span>
    <div class="post_title">${res2[i].date} <span class="glyphicon glyphicon-trash" onclick="deleteComment(this,${res2[i].id},'system',${index})"></span></div>
    <div class="post_content"><span class="fans">${user1[0]}</span>${user1[1]}</div>
    <span style="cursor: default;" onclick="turnPage(${res2[i].postsId})">查看详情</span>
</div>`
        }
        if(`${res2[i].confirmStatus}`==1){
            var html1=`
            <div class="person_post">
    <div class="post_title">${res2[i].date} <span class="glyphicon glyphicon-trash" onclick="deleteComment(this,${res2[i].id},'system',${index})"></span></div>
    <div class="post_content"><span class="fans">${user1[0]}</span></div>
    <span style="cursor: default;" onclick="turnPage(${res2[i].postsId})">查看详情</span>   
</div>`
        }
        document.getElementsByClassName('system')[0].innerHTML+=html1;
    var defalutPager={
    currentPage:1,
    pageSize:8,
    divNumber:1,
    total:0,
    pageNumber:0,
    }
    var pager=Object.assign(defalutPager,pager);
createPager(pager,res1.data);
addnumber3(pager);
blidEvent(pager);
    }
}}

}
function createPager(pager,data){
    pager.total=data.page.totalRecord;
    pager.pageSize=data.page.pageSize;
    pager.currentPage=data.page.currentPage;
    pager.pageNumber=Math.ceil(pager.total/data.page.pageSize);
}
function addnumber1(pager){
    var item=``;
    var pagenum=``;
    for(let i=0;i<pager.pageNumber;i++){
        if(i==pager.currentPage-1){
            pagenum+=`<li><a href="#" class="num"  style="background-color: rgb(236, 236, 236);">${i+1}</a></li>`
        }
        else{
            pagenum+=`<li><a href="#" class="num">${i+1}</a></li>`
        }
        
    }
    if(pager.currentPage!==1){
      item=`<li><a href="#" class="prev">&laquo;</a></li>`;
      pagenum=item+pagenum;
    }
    if(pager.currentPage!==pager.pageNumber){
      item=` <li><a href="#" class="next">&raquo;</a></li>`
      pagenum=pagenum+item;
    }
      document.getElementsByClassName('pagination')[0].innerHTML=pagenum;
    
    }
    function addnumber2(pager){
        var item=``;
        var pagenum=``;
        for(let i=0;i<pager.pageNumber;i++){
            if(i==pager.currentPage-1){
                pagenum+=`<li><a href="#" class="num"  style="background-color: rgb(236, 236, 236);">${i+1}</a></li>`
            }
            else{
                pagenum+=`<li><a href="#" class="num">${i+1}</a></li>`
            }
            
        }
        if(pager.currentPage!==1){
          item=`<li><a href="#" class="prev">&laquo;</a></li>`;
          pagenum=item+pagenum;
        }
        if(pager.currentPage!==pager.pageNumber){
          item=` <li><a href="#" class="next">&raquo;</a></li>`
          pagenum=pagenum+item;
        }
          document.getElementsByClassName('pagination')[1].innerHTML=pagenum;
        
        }
        function addnumber3(pager){
            var item=``;
            var pagenum=``;
            for(let i=0;i<pager.pageNumber;i++){
                if(i==pager.currentPage-1){
                    pagenum+=`<li><a href="#" class="num"  style="background-color: rgb(236, 236, 236);">${i+1}</a></li>`
                }
                else{
                    pagenum+=`<li><a href="#" class="num">${i+1}</a></li>`
                }
                
            }
            if(pager.currentPage!==1){
              item=`<li><a href="#" class="prev">&laquo;</a></li>`;
              pagenum=item+pagenum;
            }
            if(pager.currentPage!==pager.pageNumber){
              item=` <li><a href="#" class="next">&raquo;</a></li>`
              pagenum=pagenum+item;
            }
              document.getElementsByClassName('pagination')[2].innerHTML=pagenum;
            
            }
    //绑定事件
    function blidEvent(pager){
       document.getElementsByClassName('pagination')[0].addEventListener('click',function(e){
      var classlist=e.target.getAttribute('class');
      if(classlist.search('prev')!==-1){
          toPage(pager.currentPage-1,pager);
      }
      else if(classlist.search('next')!==-1){
        toPage(pager.currentPage+1,pager);
      }
      else if(classlist.search('num')!==-1){
        var num=e.target.innerHTML;
        console.log(num)
        toPage(num,pager);
      }
    })
    }
    //跳转页码
    function toPage(page,pager){
      if(page<1){
        page=1;
      }
      else if(page>pager.pageNumber){
        page=pager.pageNumber;
      }
      pager.currentPage=page;
      addComment(pager.currentPage);
    }
function deleteComment(e,id,type,index){
    var token=localStorage.getItem("token");
    console.log(token)
                    var xhr=new XMLHttpRequest();
                    xhr.open('get','http://43.140.247.80:8080/inform/delete/'+id);
                    xhr.withCredentials=true;
                    xhr.setRequestHeader("Content-Type", "application/json"); 
                    xhr.setRequestHeader("Authorization",token);
                    xhr.send();
                    xhr.onreadystatechange=function(){
                    if(xhr.readyState===4&&xhr.status===200){
                    var res=JSON.parse(xhr.responseText);
                    console.log(res.data);
                    e.parentNode.parentNode.remove();
                    if(res.data=='删除成功'){
                        console.log(e);
                        if(type=='comment'){
                             addComment(index);
                        }
                        else if(type=='follow'){
                            addFollow(index);
                        }
                        else if(type=='system'){
                            addSystem(index);
                        }
                    
                    }
                   
                }
            }
    }
