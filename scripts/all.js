// jquery�ı�����css����
$(document).ready(function () {

    $("input,textarea").focus(function () {
        $(this).addClass("sffocus");
    });
    $("input,textarea").blur(function () {
        $(this).removeClass("sffocus");
    });
});

//��ҳ��ת
function gotoPage(urlStr) {
    //���ﻹ��Ҫʵ��һЩ��������ҳ��İ�ȫ����֤�����粻��Ϊ�գ�������������Щ��
    var page = document.getElementById("PageInput").value;
    window.location.href = urlStr + "&page=" + page;
}

//��ӡ
function Print() {
    bdhtml = window.document.body.innerHTML;
    sprnstr = "<!--startprint-->";
    eprnstr = "<!--endprint-->";
    prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
    window.document.body.innerHTML = prnhtml;
    window.print();
}

//����ղؼ�
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������");
        }
    }
}

//��Ϊ��ҳ
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("�˲�����������ܾ���\n�����������ַ�����롰about:config�����س�\nȻ�� [signed.applets.codebase_principal_support]��ֵ����Ϊ'true',˫�����ɡ�");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}

/*
scaling     �Ƿ�ȱ����Զ�����
width       ͼƬ����
height      ͼƬ����
loadpic     �����е�ͼƬ·��
*/
(function ($) {
    jQuery.fn.LoadImage = function (settings) {
        settings = jQuery.extend({
            scaling: true,
            width: 500,
            height: 500,
            loadpic: ""
        }, settings);
        return this.each(function () {
            $.fn.LoadImage.Showimg($(this), settings);
        });
    };
    $.fn.LoadImage.Showimg = function ($this, settings) {
        var src = $this.attr("src");
        var img = new Image();
        img.src = src;
        var autoScaling = function () {
            if (settings.scaling) {
                if (img.width > 0 && img.height > 0) {
                    if (img.width / img.height >= settings.width / settings.height) {
                        if (img.width > settings.width) {
                            $this.width(settings.width);
                            $this.height((img.height * settings.width) / img.width);
                        }
                        else {
                            $this.width(img.width);
                            $this.height(img.height);
                        }
                    }
                    else {
                        if (img.height > settings.height) {
                            $this.height(settings.height);
                            $this.width((img.width * settings.height) / img.height);
                        }
                        else {
                            $this.width(img.width);
                            $this.height(img.height);
                        }
                    }
                }
            }
        }
        //��ȷ�����Զ���ȡ����ͼƬ
        if (img.complete) {
            autoScaling();
            return;
        }
        $this.attr("src", "");

        var loading = $("<img alt=\"�����С�\" title=\"ͼƬ�����С�\" src=\"" + settings.loadpic + "\" />");
        $this.hide();
        $this.after(loading);
        $(img).load(function () {
            autoScaling();
            loading.remove();
            $this.attr("src", this.src);
            $this.fadeIn('slow');
        });
    }
})(jQuery);