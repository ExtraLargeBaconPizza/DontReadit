(function()
{
    var readyStateCheckInterval = setInterval(function() 
    {
        removeSideAds();
        removePromotedAds();
        removeOldSideAds();
        removeOldPromotedAds();

        if (document.readyState == 'complete') 
        {
            clearInterval(readyStateCheckInterval);
        }
    }, 100); 

    // need to check again any time a node is inserted to the page
    $(document).on('DOMNodeInserted', function(e) 
    {
        removeSideAds();
        removePromotedAds($(e.target));
    });
})();

function removeSideAds()
{
    $('div[data-before-content="advertisement"]:visible').each(function() 
    {
        this.parentNode.parentNode.parentNode.style.display = "none";
    });
}

function removePromotedAds()
{
    $(".icon-lock:visible").each(function() 
    {
        getParentNodeUntilNoClassThenHide(this);
    });
}

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

// why don't you come and see me when you've got no class - Rodney Dangerfield
function getParentNodeUntilNoClassThenHide(element)
{
    if (element.className != '')
    {
        getParentNodeUntilNoClassThenHide(element.parentNode);
    }
    else
    {
        element.style.display = "none";
    }
}