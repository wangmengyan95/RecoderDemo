var fileRootPath;
var selectedSoundName;

$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
})

function onDeviceReady() {
    alert("ready");
    // $("#captureAudio").click(function(){
    //     alert("start");
    //     captureAudio();
    //     alert("end");
    // }

    // console.log("list");
    makeListContent();


    var mediaRecord;
    $("#record").on("vmousedown",function(){
        console.log("down");
        // $("#popup").popup("open");
        $("#record").text('松开 结束');
        var date=new Date();
        var path=date.getHours()+"_"+date.getMinutes()+"_"+date.getSeconds()+".wav";
        mediaRecord=new Media(path,playSuccess,playError);
        mediaRecord.startRecord();
    });

    $("#record").on("vmouseup",function(){
        if(mediaRecord==null) console.log("empty");
        console.log("up");
        //$("#popup").popup("close");
        $("#record").text('按下 说话');
        mediaRecord.stopRecord();
    });

    $(".backToList").click(function(){
        makeListContent();
    });

    $(".soundListItem").click(selectSound);

    $(document).on("pagebeforeshow","#player",function(){
         $("#soundName").html(selectedSoundName);
          // console.log(selectSoundName);
          // console.log($("#soundName").html());
          // console.log($("#soundName").val());
    });

    $("#playButton").click(function(){
        var soundPath=fileRootPath+selectedSoundName;
        playRecord(soundPath);
    });
}
function selectSound(){
    selectedSoundName=$(this).html();
    // console.log(selectedSoundName);
    // console.log(fileRootPath);
}
function makeListContent(){
    // console.log("start");
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess,onFileSystemError);
}

// function captureAudio(){
//     navigator.device.capture.captureAudio(captureSuccess,captureError,{});
// }

// function captureSuccess(mediaFiles){
//     for(i=0;i<=mediaFiles.length-1;i++){
//         var path=mediaFiles[i].fullPath;
//         alert(path);
//         playRecord(path);
//     }
// }

// function captureError(error){
//     alert(error.code);
// }

function playRecord(path){
    alert("play");
    var media=new Media(path,playSuccess,playError);
    media.seekTo(0);
    media.play();
}

function playSuccess(){
    console.log("success");
}

function playError(error){
    console.log(error.code);
    console.log(error.message);
}

// function onFileSystemSuccess(fileSystem){
//     console.log(fileSystem.name);
//     console.log("1");
//     var dirReader=fileSystem.root.createReader();
//     console.log(dirReader);
//     // dirReader.readEntries(function(entries){
//     //     $("#list").html("");

//     //     console.log("1");
//     //     if(entries.length>0){
//     //         var fullPath=entries[0].fullPath;
//     //         var fileName=entries[0].name;
//     //         console(fullPath.indexOf(fileName));
//     //     }
//     //     for(var i=0;i<=entries.length-1;i++){
//     //         var name=entries[i].name;
//     //         if(name.indexOf(".wav")>0){
//     //             console.log(name);
//     //             $("#list").append("<li><a href=\"#player\" class=\"soundListItem\">"+name+"</li>");
//     //         }
//     //     }
//     //     $(".soundListItem").on("click", selectSound);
//     //     $("#list").listview("refresh");
//     // });
//     // dirReader.readEntries(function(entries)){
//     //     console.log("3");
//     // };
// }

function onFileSystemSuccess(fileSystem){
    console.log(fileSystem.name);
    var dirReader=fileSystem.root.createReader();
    dirReader.readEntries(function(entries){
        $("#list").html("");

        var length=entries.length;
        if(length>0){
            var fullPath=entries[0].fullPath;
            var fileName=entries[0].name;
            var index=fullPath.indexOf(fileName);
            fileRootPath=fullPath.substring(0,index);
            //console.log(fileRootPath);
        }

        for(var i=0;i<=entries.length-1;i++){
            var name=entries[i].name;
            var fullPath=entries[i].fullPath;
            if(name.indexOf(".wav")>0){
                // console.log(name);
                // console.log(fullPath);
                $("#list").append("<li><a href=\"#player\" class=\"soundListItem\">"+name+"</li>");
            }
        }
        $(".soundListItem").on("click", selectSound);
        $("#list").listview("refresh");

    });
}

function onFileSystemError(evt){
    console.log("fileError");
}