(function()
{
    var urlOrigin = window.location.origin;
    var oldReddit = urlOrigin.includes("old");

    var readyStateCheckInterval = setInterval(function() 
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

        if (document.readyState == "complete") 
        {
            clearInterval(readyStateCheckInterval);
        }
    }, 100); 

    if(!oldReddit)
    { 
        // need to check again any time a node is inserted to the page
        $(document).on('DOMNodeInserted', function(e) 
        {
            removeSideAds();
            removePromotedAds();
        });
    }    
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