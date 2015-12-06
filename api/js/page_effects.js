function visibleInParent(element) {
    var position = $(element).position().top
    return position > -50 && position < ($(element).offsetParent().height() - 50)
}

function hasFragment(link, fragment) {
    return $(link).attr("href").indexOf("#" + fragment) != -1
}

function findLinkByFragment(elements, fragment) {
    return $(elements).filter(function(i, e) { return hasFragment(e, fragment)}).first()
}

function scrollToCurrentVarLink(elements) {
    var elements = $(elements);
    var parent   = elements.offsetParent();

    if (elements.length == 0) return;

    var top    = elements.first().position().top;
    var bottom = elements.last().position().top + elements.last().height();

    if (top >= 0 && bottom <= parent.height()) return;

    if (top < 0) {
        parent.scrollTop(parent.scrollTop() + top);
    }
    else if (bottom > parent.height()) {
        parent.scrollTop(parent.scrollTop() + bottom - parent.height());
    }
}

function setCurrentVarLink() {
    $('.secondary a').parent().removeClass('current')
    $('.anchor').
        filter(function(index) { return visibleInParent(this) }).
        each(function(index, element) {
            findLinkByFragment(".secondary a", element.id).
                parent().
                addClass('current')
        });
    scrollToCurrentVarLink('.secondary .current');
}

var hasStorage = (function() { try { return localStorage.getItem } catch(e) {} }())

function scrollPositionId(element) {
    var directory = window.location.href.replace(/[^\/]+\.html$/, '')
    return 'scroll::' + $(element).attr('id') + '::' + directory
}

function storeScrollPosition(element) {
    if (!hasStorage) return;
    localStorage.setItem(scrollPositionId(element) + "::x", $(element).scrollLeft())
    localStorage.setItem(scrollPositionId(element) + "::y", $(element).scrollTop())
}

function recallScrollPosition(element) {
    if (!hasStorage) return;
    $(element).scrollLeft(localStorage.getItem(scrollPositionId(element) + "::x"))
    $(element).scrollTop(localStorage.getItem(scrollPositionId(element) + "::y"))
}

function persistScrollPosition(element) {
    recallScrollPosition(element)
    $(element).scroll(function() { storeScrollPosition(element) })
}

function sidebarContentWidth(element) {
    var widths = $(element).find('.inner').map(function() { return $(this).innerWidth() })
    return Math.max.apply(Math, widths)
}

function resizeSidebars() {
    var primaryWidth   = sidebarContentWidth('.primary') + 30
    var secondaryWidth = 0

    if ($('.secondary').length != 0) {
        secondaryWidth = sidebarContentWidth('.secondary') + 30
    }

    // snap to grid
    var snap = 30
    primaryWidth   = Math.ceil(primaryWidth / snap) * snap
    secondaryWidth = Math.ceil(secondaryWidth / snap) * snap

    $('.primary').css('width', primaryWidth)
    $('.secondary').css('width', secondaryWidth).css('left', primaryWidth + 1)

    if (secondaryWidth > 0) {
        $('#content').css('left', primaryWidth + secondaryWidth + 2)
    }
    else {
        $('#content').css('left', primaryWidth + 1)
    }
}

$(window).ready(resizeSidebars)
$(window).ready(setCurrentVarLink)
$(window).ready(function() { persistScrollPosition('.primary')})
$(window).ready(function() {
    $('#content').scroll(setCurrentVarLink)
    $(window).resize(setCurrentVarLink)
})
