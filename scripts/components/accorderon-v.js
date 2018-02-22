/**
 * Created by 2501 on 31.05.2017.
 */
module.exports = function (selector, tabSelector, activeTabClass) {
    tabSelector = tabSelector || '.js-accordeon-item';

    activeTabClass = activeTabClass || 'tab-active';

    let $items = $(selector);

    $items.each(function () {
        let $tabContentList;
        let $tabs = $(this).find(tabSelector);

        $tabs.not('.no-tab').each(function (i) {
            let $tabContentItem = $($(this).attr('data-tab-selector'));

            if ($tabContentList === undefined) {
                $tabContentList = $tabContentItem;
            } else {
                $tabContentList = $tabContentList.add($tabContentItem);
            }
            $(this).click(function () {
                $active = $tabContentList.eq(i);
                $tabContentList.removeClass(activeTabClass);
                $active.addClass(activeTabClass);
            });
        });

        let $active = $items.eq(0);

        // $tabs.filter('.no-tab').each(function (i) {
        // });

        // console.log($tabs.eq(0).not('.no-tab'));
        $tabs.eq(0).not('.no-tab').click();
    });
};