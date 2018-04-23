
var maskLoadPlugin = (function () {
    //加载文字，图片
    var context = { title: { hasTXT: true, txt: '加载中，请稍候...' }, image: { hasImg: true, url: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193943.gif' } };
    /**
     * loading效果布局为：
     * <div class='mask-load'>
     *   <div class="mask"></div>
     *   <div class="load"></div>
     * </div>
     * maskLoadEle是class='mask-load'的div对象
     * maskEle是class="mask"的div对象
     * loadEle是class="load"的div对象
     */
    var maskLoadEle;
    var maskEle;
    var loadEle;
    //默认下是整个页面产生loading效果
    var view = 'body';
    //产生loading效果的可视区宽度，高度，距左，距右
    var viewWidth = 0;
    var viewHeight = 0;
    var viewLeft = 0;
    var viewTop = 0;
    /*context:
     *  {title:{hasTXT:true,txt:'true的时候，输入加载的文字;false时，不显示加载文字'},
     *   image:{hasImg:true,url:'图片地址;false时不显示图片'}
     *   
     *  }
     * 
     */
    //context: {title: { hasTXT: true, txt: '加载中...' }, image: { hasImg: true, url: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193943.gif' } },
    //maskLoad: {},
    //maskEle: {},
    //loadEle: {},
    //调用接口
    return {
        lockView: function (/*thisObj*/) {

            /*
            if (thisObj instanceof Element) {
                var clsValue = thisObj.getAttribute('class');
                var pattern = /^mask-load$/;//^n:以n为开头,这里n是m，还是mask-load
                if (pattern.test(clsValue)) {
                    maskLoadEle = thisObj;
                } else {
                    maskLoadEle = document.createElement('div');
                    maskLoadEle.setAttribute('class', 'mask-load');
                    document.body.appendChild(maskLoadEle);
                }
            } else {
                return;
            }*/


            //maskLoadEle = document.getElementsByClassName('mask-load');
            //判断可视区域类型

            maskLoadEle = document.createElement('div');
            maskLoadEle.setAttribute('class', 'mask-load');
            document.body.appendChild(maskLoadEle);

            maskEle = document.createElement('div');
            loadEle = document.createElement('div');
            maskEle.setAttribute('class', 'mask');
            loadEle.setAttribute('class', 'loading');
            loadEle.innerHTML = '      ';
            //选择区下，调整位置和宽高
            if (view != 'body') {
                maskEle.style.width = viewWidth;
                maskEle.style.height = viewHeight;
                //遮罩在屏幕中的位置与要锁定的元素保持一致
                maskEle.style.left = viewLeft;
                maskEle.style.top = viewTop;

                loadEle.style.width = viewWidth;
                loadEle.style.height = viewHeight;
                loadEle.style.padding = '0px';
                //加载区在屏幕中的位置与要锁定的元素保持一致
                loadEle.style.left = viewLeft;
                loadEle.style.top = viewTop;

            }

            maskLoadEle.appendChild(maskEle);
            maskLoadEle.appendChild(loadEle);
            //加载文字设置
            if (view == 'body') {
                loadEle.innerHTML = context.title.hasTXT ? context.title.txt : '      ';
            }
            //加载图片设置
            if (context.image.hasImg) {
                loadEle.style.background = 'url("' + context.image.url + '") 5px 5px';
                loadEle.style.backgroundRepeat = 'no-repeat';
                //loadEle.style.backgroundPosition = '5px 5px';//设置无效,why?
                loadEle.style.backgroundAttachment = 'scroll';
                //整个可视区下，加载区显示
                if (view == 'body') {
                    loadEle.style.backgroundColor = 'white';
                    loadEle.style.border = '1px solid rgb(204,204,204)';

                }
                //加载图片居中
                if (view != 'body') {
                    loadEle.style.backgroundPosition = "center";
                }

            }
            return this;
        },
        //配置接口
        config: function () {

            if (arguments[0]) {
                var args = arguments[0];
                //加载文字配置,判断文字开关是否类型正确
                if (args.title && (typeof args.title.hasTXT === 'boolean')) {
                    context.title.txt = (args.title.hasTXT ? args.title.txt : '');
                }
                //加载图片配置，判断图片开关是否类型正确
                if (args.image && (typeof args.image.hasImg === 'boolean')) {
                    if (args.image.hasImg) context.image.url = args.image.url;
                }
            }

            return this;
        },

        unlockView: function () {
            maskLoadEle.innerHTML = '';
            document.body.removeChild(maskLoadEle);
            return this;
        },
        selectView: function (selector) {
            if (selector instanceof Element) {
                view = selector.tagName.toLowerCase();
                viewWidth = selector.offsetWidth;
                viewHeight = selector.offsetHeight;
                viewLeft = selector.offsetLeft;
                viewTop = selector.offsetTop;
            }
            return this;
        }




    }
}())
