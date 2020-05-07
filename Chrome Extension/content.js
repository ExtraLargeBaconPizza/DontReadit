(function()
{
    var urlOrigin = window.location.origin;
    var oldReddit = urlOrigin.includes("old");
    
    var observer = new MutationObserver(function(mutations) 
    {
        if(oldReddit)
        { 
            removeOldSideAds();
            removeOldPromotedAds();
        }
        else
        {
            removeSideAds();
            removePromotedAds();
        }
    });

    var container = document.documentElement;
    var config = { childList: true, subtree: true  };

    observer.observe(container, config);
    
})();

function removeOldSideAds()
{
    $(".ad-container").each(function()
    {
        this.parentNode.removeChild(this);
    });
}

function removeOldPromotedAds()
{
    $(".promotedlink").each(function()
    {
        this.parentNode.removeChild(this);
    });
}

function removeSideAds()
{
    $('div[data-before-content="advertisement"]:visible').each(function()
    {
        this.parentNode.parentNode.parentNode.style.display = "none";
    });
}

function removePromotedAds()
{
    // this is so we get the spans that contain exactly "promoted"
    $.expr[':'].textEquals = $.expr.createPseudo(function(arg) 
    {
        return function( elem ) 
        {
            return $(elem).text().match("^" + arg + "$");
        };
    });
    
    $('span:textEquals("promoted"):visible').each(function() 
    {
        getParentNodeUntilNoClassThenHide(this);
    });
}

// why don't you come and see me when you've got no class - Rodney Dangerfield
function getParentNodeUntilNoClassThenHide(element)
{
    if (element.className != '')
    {
        if (element.parentNode != null)
        {
            getParentNodeUntilNoClassThenHide(element.parentNode);
        }
    }
    else
    {
        element.style.display = "none";
    }
}