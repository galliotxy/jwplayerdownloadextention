/**
 * Created with JetBrains WebStorm.
 * User: asus
 * Date: 14-8-22
 * Time: 上午1:25
 * To change this template use File | Settings | File Templates.
 */
(function(){

    if(document.getElementsByTagName('video').src == null)
    {
        if(document.getElementById('closeb') != null)
        {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            document.getElementById('closeb').dispatchEvent(evt);
            //document.getElementById('closeb').click;
        }



        //document.getElementById('player_display').click();
        //document.getElementsByTagName('video')[0].load();
    }


}());
