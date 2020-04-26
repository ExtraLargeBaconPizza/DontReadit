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
    var elem = document.getElementsByTagName("div");

    for(var i=0; i < elem.length; i++)
    {
        if(elem[i].getAttribute("data-before-content"))
        { 
            elem[i].parentNode.parentNode.parentNode.style.display = "none"; 
        }
    }
}

function removePromotedAds()
{
    var elem = document.getElementsByTagName('span'); 

    for (var i = 0; i < elem.length; i++) 
    { 
        if (elem[i].innerText.match(/promoted/i))
        {
            getParentNodeUntilNoClassThenRemove(elem[i]);
        }
    }
}

// why don't you come and see me when you've got no class - Rodney Dangerfield
function getParentNodeUntilNoClassThenRemove(element)
{
    if (element.className != '')
    {
        getParentNodeUntilNoClassThenRemove(element.parentNode);
    }
    else
    {
        element.style.display = "none";
    }
}