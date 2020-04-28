(function()
{
    removeSideAds();
    removePromotedAds();

    // need to check again any time a node is inserted to the page
    $(document).on('DOMNodeInserted', function(e) 
    {
        removeSideAds();
        removePromotedAds();
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
    $("span:contains(promoted):visible").each(function() 
    {
        getParentNodeUntilNoClassThenHide(this);
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