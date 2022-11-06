window.onload=function(){
    var token=localStorage.getItem("token");
    console.log(token);
    
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    console.log(url3);
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://43.140.247.80:8080/posts/show/'+url3);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res=JSON.parse(xhr.responseText);
            console.log(res);
            adddata(res);
            if(token!==null){
        
                var navi=`<ul>
                <li><a href="../loginhome/login.html"><button id="chosed">BBS</button></a>  </li>
                <li> </li>
                <li></li>
                <li></li>
                <li><a href=""><button> <span class="glyphicon glyphicon-bell"></span><span class="font">消 息</span> </button></a>  </li>
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
        }
    }
    xhr.send();

//评论点赞
    // document.getElementsByClassName('text')[0].onclick=(event)=>{
    //     var token=localStorage.getItem("token");
    //     if(event.target.className=="likenumber"){
    //             event.target.classList.add("likenumberactive");    
    //             var num=event.target.getElementsByTagName('span')[0].innerHTML;
    //             //console.log(num);
    //             var num2=Number(num)+1
    //             event.target.getElementsByTagName('span')[0].innerHTML=num2;
    //         }
    //        else if(event.target.classList.contains('likenumberactive')){
    //         event.target.classList.remove("likenumberactive");
    //         var numm=event.target.getElementsByTagName('span')[0].innerHTML;
    //         console.log(numm)
    //         event.target.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
    //      }
    //         var postId=event.target.id;
    //         var xhr=new XMLHttpRequest();
    //         xhr.open('get','http://43.140.247.80:8080/comment/update/like/one/'+postId);
    //         xhr.withCredentials=true;
    //         xhr.setRequestHeader("Content-Type", "application/json"); 
    //         xhr.setRequestHeader("Authorization",token);
    //         xhr.send();
    //         xhr.onreadystatechange=function(){
    //         if(xhr.readyState===4&&xhr.status===200){
    //         var res=JSON.parse(xhr.responseText);
    //     }
    //     }
    // }
//帖子点赞
document.getElementById('post_text').onclick=(event)=>{
    var token=localStorage.getItem("token");
            if(event.target.className=="likenumber"){
                    event.target.classList.add("likenumberactive");    
                    var num=event.target.getElementsByTagName('span')[0].innerHTML;
                    //console.log(num);
                    var num2=Number(num)+1
                    event.target.getElementsByTagName('span')[0].innerHTML=num2;
                }
               else if(event.target.classList.contains('likenumberactive')){
                event.target.classList.remove("likenumberactive");
                var numm=event.target.getElementsByTagName('span')[0].innerHTML;
                console.log(numm)
                event.target.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
             }
                var postId=event.target.id;
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/posts/like/update/'+postId);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
            }
            }
}
        //一级评论渲染
        addComment1(url3);
       
            //展开
            var text=document.getElementsByClassName('text')[0];
            text.onclick=function(event){
                if(event.target.className=='open-close'){
                    if(event.target.innerHTML=='<div class="glyphicon glyphicon-chevron-down"></div> 展开更多'){
                        event.target.innerHTML='<div class="glyphicon glyphicon-chevron-up"></div> 收起';
                    }
                    else{
                        event.target.innerHTML='<div class="glyphicon glyphicon-chevron-down"></div> 展开更多';
                    }
                }
            }
}
function adddata(res){
    console.log(res);
    var user_ph2=`<img src="${res.data.idPhoto}" alt="">
    <p>${res.data.nickName}</p> `
    document.getElementsByClassName('urser_ph')[0]=user_ph2;
    var post_urser=`<img src="${res.data.posts.user.idPhoto}" alt="">`;
    document.getElementById('post_urser').innerHTML=post_urser;
    var post_header=`<ul>
    <li style="font-size: 25px; font-weight:bold;">${res.data.posts.user.nickName}</li>
    <li></li>
    <li></li>
    <li>发布于 ${res.data.posts.date}</li>
</ul>`
    document.getElementById('post_header').innerHTML=post_header;
    if(`${res.data.posts.likeStatus}`==0){
        var post_text=`<p>${res.data.blockName}  正文> <span class="post_like">
    <span class="likenumber" id="${res.data.posts.id}"> <span class="like"> ${res.data.posts.likeNumber}</span></span>
    <span class="glyphicon glyphicon-comment com-btn"><span class="commentnumber">${res.data.posts.scanNumber}</span></span>
   </span>
</p>  
    <div id="post_title">
        <h2>${res.data.posts.head} 
        <div class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.posts.scanNumber}</span></div> 
        </h2>
    </div>
    <div class="text1">
        ${res.data.posts.body}
    </div>`
    }
    else{
        var post_text=`<p>${res.data.blockName}  正文> <span class="post_like">
    <span class="likenumber likenumberactive" id="${res.data.posts.id}"> <span class="like"> ${res.data.posts.likeNumber}</span></span>
    <span class="glyphicon glyphicon-comment com-btn"><span class="commentnumber">${res.data.posts.scanNumber}</span></span>
   </span>
</p>  
    <div id="post_title">
        <h2>${res.data.posts.head} 
        <div class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.posts.scanNumber}</span></div> 
        </h2>
    </div>
    <div class="text1">
        ${res.data.posts.body}
    </div>`
    }
    
    document.getElementById('post_text').innerHTML=post_text;
    for(let i=0;i<`${res.data.fileList.length}`;i++){
      var downloadfile=`
    <span class="downloadcontainer">${res.data.fileList[i].fileName}<button onclick="downLoad('${res.data.fileList[i].fileName}',${res.data.fileList[i].id})" class="downLoad">点击下载</button></span>`
    document.getElementById('post_text').innerHTML+=downloadfile;  
    }
    
}
function downLoad(fileName,id2){
    var token=localStorage.getItem("token");
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/file/download/27'); 
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization",token);
        xhr.responseType="blob";
        xhr.onload=function(oEvent){
                var content=xhr.response;
                var elink=document.createElement('a');
                elink.download=fileName;
                elink.style.display='none';
                var blob=new Blob([content]);
                console.log(blob)
                elink.href=URL.createObjectURL(blob);
                elink.click();
        }
        xhr.send(JSON.stringify({
            id:id2
        }))
}
function addComment1(url3){
    var token=localStorage.getItem("token");
    var xhr2=new XMLHttpRequest();
    xhr2.open('get','http://43.140.247.80:8080/comment/show/one/'+url3);
    xhr2.withCredentials=true;
            xhr2.setRequestHeader("Content-Type", "application/json"); 
            xhr2.setRequestHeader("Authorization",token);
            xhr2.send();
            xhr2.onreadystatechange=function(){
            if(xhr2.readyState===4&&xhr2.status===200){
            var re=JSON.parse(xhr2.responseText);
            addComment(re);
        }
        }
}
function addComment(res){
    document.getElementsByClassName('container-fluid')[0].innerHTML='';
    var i=0;
    if(res.data.commentPage.length!==0){
        for( i=0;i<`${res.data.commentPage.length}`;i++){
    var childComment=res.data.commentPage[i].childCommentList.length;
    var childCom=res.data.commentPage[i].childCommentList; 
    var h2=``
    if(childComment!=0){
        for(let j=0;j<childComment;j++){
            if(j<=1){
                if(`${childCom[j].likeStatus}`==0){
                     h2+=`
        <div>
            <div class="row-fluid2">
            <div class="col-md-1 col-sm-2">
                <img src="${childCom[j].userSend.idPhoto}" alt="">
            </div>
            <div class="col-md-11">
                <div class="com-name">${childCom[j].userSend.nickName} <span style="color:gray;font-size:12px;font-weight:lighter;">回复</span>  ${childCom[j].userReply.nickName} ${childCom[j].date}</div>
                <span onclick="deleteComment(this,'two',${childCom[j].id})" class="deletComment glyphicon glyphicon-trash"></span>
                <p>
                ${childCom[j].body}
                <span class="likenumber" onclick="secondLike(this)" id="${childCom[j].id}"> <span class="like"> ${childCom[j].likeNumber}</span></span>
                <span class="glyphicon glyphicon-comment com-btn" data-toggle="modal" data-target="#myModal${childCom[j].id}"></span>
            </span>
            <div class="modal fade" id="myModal${childCom[j].id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        &times;
                                                    </button>
                                                    <h4 class="modal-title" id="myModalLabel">
                                                        回复他/她
                                                    </h4>
                                                </div>
                                                <div class="modal-body" contenteditable="true" aria-placeholder="欢迎高质量评论"></div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                                    </button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal" style="background: #284bd5;" onclick="secondComment(this,${res.data.commentPage[i].id},${childCom[j].userReply.id})">
                                                        发送
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                </p>
            </div>
           </div>
        </div> `
                }
                else{
                    h2+=`
                    <div>
                        <div class="row-fluid2">
                        <div class="col-md-1 col-sm-2">
                            <img src="${childCom[j].userSend.idPhoto}" alt="">
                        </div>
                        <div class="col-md-11">
                            <div class="com-name">${childCom[j].userSend.nickName} <span style="color:gray;font-size:12px;font-weight:lighter;">回复</span>  ${childCom[j].userReply.nickName} ${childCom[j].date}</div>
                            <span onclick="deleteComment(this,'two',${childCom[j].id})" class="deletComment glyphicon glyphicon-trash"></span>
                            <p>
                            ${childCom[j].body}
                            <span class="likenumber likenumberactive" onclick="secondLike(this)" id="${childCom[j].id}"> <span class="like"> ${childCom[j].likeNumber}</span></span>
                            <span class="glyphicon glyphicon-comment com-btn" data-toggle="modal" data-target="#myModal${childCom[j].id}"></span>
                        </span>
                        <div class="modal fade" id="myModal${childCom[j].id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                                    &times;
                                                                </button>
                                                                <h4 class="modal-title" id="myModalLabel">
                                                                    回复他/她
                                                                </h4>
                                                            </div>
                                                            <div class="modal-body" contenteditable="true" aria-placeholder="欢迎高质量评论"></div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                                                </button>
                                                                <button type="button" class="btn btn-primary" data-dismiss="modal" style="background: #284bd5;" onclick="secondComment(this,${res.data.commentPage[i].id},${childCom[j].userReply.id})">
                                                                    发送
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                            </p>
                        </div>
                       </div>
                    </div> `
                }
                
            }
           
        if(j==2){
            var apart1=`<div data-toggle="collapse" data-target=".${res.data.commentPage[i].id}${childCom[j].userReply.id}demo" class="open-close"><div class="glyphicon glyphicon-chevron-down"></div> 展开更多</div>`
            h2+=apart1;
        }
        if(j>=2){
            h2+=`
        <div class="${res.data.commentPage[i].id}${childCom[j].userReply.id}demo collapse">
            <div class="row-fluid2">
            <div class="col-md-1 col-sm-2">
                <img src="${childCom[j].userSend.idPhoto}" alt="">
            </div>
            <div class="col-md-11">
                <div class="com-name">${childCom[j].userSend.nickName} <span style="color:gray;font-size:12px;font-weight:lighter;">回复</span>  ${childCom[j].userReply.nickName} ${childCom[j].date}</div>
                <span onclick="deleteComment(this,'two',${childCom[j].id})" class="deletComment glyphicon glyphicon-trash"></span>
                <p>
                ${childCom[j].body}
                <span class="likenumber" onclick="secondLike(this)" id="${childCom[j].id}"> <span class="like"> ${childCom[j].likeNumber}</span></span>
                <span class="glyphicon glyphicon-comment com-btn" data-toggle="modal" data-target="#myModal${childCom[j].id}"></span>
            </span>
            <div class="modal fade" id="myModal${childCom[j].id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            回复他/她
                        </h4>
                    </div>
                    <div class="modal-body" contenteditable="true" aria-placeholder="欢迎高质量评论"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                        </button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" style="background: #284bd5;" onclick="secondComment(this,${res.data.commentPage[i].id},${childCom[j].userReply.id})">
                            发送
                        </button>
                    </div>
                </div>
            </div>
        </div>
                </p>
            </div>
           </div>
        </div> `
        }
        }
    }
        var h3=`
        <div class="com-name">${res.data.commentPage[i].user.nickName} ${res.data.commentPage[i].date}</div>
        <span onclick="deleteComment(this,'one',${res.data.commentPage[i].id})" class="deletComment glyphicon glyphicon-trash"></span>
        <p>
        ${res.data.commentPage[i].body}
                <span class="likenumber" onclick="firstLike(this)" id="${res.data.commentPage[i].id}"> <span class="like"> ${res.data.commentPage[i].likeNumber}</span></span>
                <span class="glyphicon glyphicon-comment com-btn" data-toggle="modal" data-target="#myModal2${res.data.commentPage[i].id}"><span class="commentnumber">${res.data.commentPage[i].childCommentNumber}</span></span>
            </span>
            <div class="modal fade" id="myModal2${res.data.commentPage[i].id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        &times;
                                                    </button>
                                                    <h4 class="modal-title" id="myModalLabel">
                                                        回复他/她
                                                    </h4>
                                                </div>
                                                <div class="modal-body" contenteditable="true" aria-placeholder="欢迎高质量评论"></div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                                    </button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal" style="background: #284bd5;" onclick="secondComment(this,${res.data.commentPage[i].id},${res.data.commentPage[i].userId})">
                                                        发送
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        </p> `
        var h4=h3+h2;
        var col=document.createElement('div');
        col.className='col-md-11';
        col.innerHTML=h4;
        var h5=`<div class="col-md-1 col-sm-2">
        <img alt="140x140" src="${res.data.commentPage[i].user.idPhoto}" />
    </div>`
    var h6=h5+col.outerHTML;
    var col1=document.createElement('div');
    col1.className='row-fluid';
    col1.innerHTML=h6;

    var conf=document.createElement('div');
    conf.className='container-fluid';
    conf.innerHTML=col1.outerHTML;

    var demo=document.createElement('div');
    if(i>2){
        demo.className='demo collapse';
    }
    demo.innerHTML=conf.outerHTML;
    document.getElementsByClassName('container-fluid')[0].innerHTML+=demo.outerHTML;
     
    if(i==2){
        // document.getElementsByClassName('demo')[i] .classList.add('collapse');   
        var apart=`<div data-toggle="collapse" data-target=".demo" class="open-close"><div class="glyphicon glyphicon-chevron-down"></div> 展开更多</div>`
        document.getElementsByClassName('container-fluid')[0].innerHTML+=apart;
        
    }
    }
    }
    else{
        console.log('hhh')
        document.getElementsByClassName('text')[0].innerHTML=''
    }
    
}
function deleteComment(e,num,id){
    console.log(num)
    var token=localStorage.getItem("token");
    console.log(token)
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/comment/delete/'+num+'/'+id);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res.data);
                if(res.data.msg=='删除成功'){
                    var url=decodeURI(window.location.href);
                var url2=url.split("?id=");
                var url3=url2[1];
                addComment1(url3);
                }
               
            }
        }
}
function firstLike(event){
    if(event.className=="likenumber"){
        event.classList.add("likenumberactive");    
        var num=event.getElementsByTagName('span')[0].innerHTML;
        //console.log(num);
        var num2=Number(num)+1
        event.getElementsByTagName('span')[0].innerHTML=num2;
    }
   else if(event.classList.contains('likenumberactive')){
    event.classList.remove("likenumberactive");
    var numm=event.getElementsByTagName('span')[0].innerHTML;
    console.log(numm)
    event.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
 }
 var postId=event.id;
 var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/comment/update/like/one/'+postId);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
            }
            }
}
function secondLike(event){
    if(event.className=="likenumber"){
        event.classList.add("likenumberactive");    
        var num=event.getElementsByTagName('span')[0].innerHTML;
        //console.log(num);
        var num2=Number(num)+1
        event.getElementsByTagName('span')[0].innerHTML=num2;
    }
   else if(event.classList.contains('likenumberactive')){
    event.classList.remove("likenumberactive");
    var numm=event.getElementsByTagName('span')[0].innerHTML;
    console.log(numm)
    event.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
 }
 var postId=event.id;
 console.log(postId);
 var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/comment/update/like/two/'+postId);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
            }
            }
}
//发表评论
function postMycommment(){
    var body=document.getElementsByClassName('mycomment')[0].innerHTML;
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var postId=url2[1];
    var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('post','http://43.140.247.80:8080/comment/add/one');
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send(JSON.stringify({
                    postsId :Number(postId) ,
                    body :body 
                }) );
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                var url=decodeURI(window.location.href);
                var url2=url.split("?id=");
                var url3=url2[1];
                addComment1(url3);
                document.getElementsByClassName('mycomment')[0].innerHTML="";
                var alert=document.getElementsByClassName('alert-success')[0];
                alert.style.display='block';
                setTimeout(function(){
                    var alert=document.getElementsByClassName('alert-success')[0];
                alert.style.display='none';
                },1000)
            }
            }
}
function secondComment(event,oneId,userId){
    console.log(oneId)
    console.log(userId);
    var body=event.parentNode.previousElementSibling.innerHTML;
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    var token=localStorage.getItem("token");
    if(body!==''){
        var xhr=new XMLHttpRequest();
                xhr.open('post','http://43.140.247.80:8080/comment/add/two');
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send(JSON.stringify({
                    oneId :Number(oneId) ,
                    useridReply:Number(userId),
                    body :body 
                }) );
                console.log(JSON.stringify({
                    oneId :Number(oneId) ,
                    useridReply:Number(userId),
                    body :body 
                }))
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                addComment1(url3);
            }
            }
    }
                
}