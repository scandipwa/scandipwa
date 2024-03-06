<?php
$colorConfig = $this->getThemeConfiguration('color_customization');
$contentConfig = $this->getThemeConfiguration('content_customization');
$title = $this->getThemeConfiguration('design/head/default_title');
$description = $this->getThemeConfiguration('design/head/default_description');
$themeColor = $this->getThemeConfiguration('webmanifest_customization/webmanifest/theme_color');
$layoutDirection = $this->getThemeConfiguration('layout_direction_configuration/layout_direction_section/layout_direction') ?: 'ltr';
$icons = $this->getAppIconData();
?>
<!DOCTYPE html>
<html lang="<?= $this->getLanguageCode() ?>" dir="<?= $layoutDirection ?>">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover">

    <!-- Muli font import from Abode
    <link rel="preload" href="https://use.typekit.net/fji5tuz.css" as="style"> -->

    <title data-prerendered="1"><?= $title ?></title>
    <meta name="description" content="<?= $description ?>" data-prerendered="1">
    <meta name="theme-color" content="#<?= $themeColor ?: 'ffffff' ?>">

    <script>
        (function() {
            if (typeof globalThis === 'object') return;
            Object.prototype.__defineGetter__('__magic__', function() {
                return this;
            });
            __magic__.globalThis = __magic__;
            delete Object.prototype.__magic__;
        }());

        // Locale
        window.defaultLocale = `<?= $this->getLocaleCode() ?>`;

        // Misc
        window.actionName = {
            type: `<?= $this->getAction(); ?>`,
            id: parseInt(`<?= $this->getId(); ?>`) || null,
            sku: `<?= $this->getSku(); ?>` || null,
            name: `<?= $this->getName(); ?>`,
            display_mode: `<?= $this->getDisplayMode(); ?>`,
            cmsPage: <?= json_encode($this->getCmsPage()); ?> || {},
            description: `<?= $this->getDescription(); ?>`,
            slider: <?= json_encode($this->getSlider()); ?> || {},
            categoryDefaultSortBy: `<?= $this->getCategoryDefaultSortBy(); ?>`,
        };
        window.contentConfiguration = <?= json_encode($contentConfig) ?> || {};
        window.storeCurrency = '<?= $this->getStoreCurrency() ?>';
        window.storeConfig = <?= json_encode($this->getStoreConfig()); ?> || {};

        // Multistore
        // do reverse sort in order prevent an issue like store code `en` replaces store code `en_us`
        window.storeList = JSON.parse(`<?= $this->getStoreListJson() ?>`).sort().reverse();
        window.storeRegexText = `/(${window.storeList.join('|')})?`;
        window.website_code = '<?= $this->getWebsiteCode() ?>';
        window.base_link_url = '<?= $this->getBaseLinkUrl() ?>';
        window.metaHtml = `
            <!-- Manifest -->
            <link rel="manifest" href="/media/webmanifest/manifest.json">
        `;
    </script>
    <script>
        // This script is made for preloading chunks and images
        const chunkValidator = {
		    // vvv Preload pages conditionaly
            category: window.actionName.type === 'CATEGORY',
            cms: window.actionName.type === 'CMS_PAGE',
            product: window.actionName.type === 'PRODUCT',
            'widget-slider': window.actionName.type === 'CMS_PAGE' && Object.keys(window.actionName.slider).length,
            // vvv Always preload current locale
            [window.defaultLocale]: true,
            render: true
        };

        const appendPreloadLink = (chunk) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = chunk;
            document.head.appendChild(link);
        }

        if (window.preloadData) {
            Object.entries(window.preloadData).forEach(([key, chunks]) => {
                if (chunkValidator[key]) {
                    chunks.forEach((c) => appendPreloadLink(c));
                }
            });
        }

        const { actionName: { slider: { slides } = {}, slider = {} } } = window;

        // Preload for slider first image
        if (Object.keys(slider).length) {
            const [{ desktop_image, mobile_image }] = slides;

            const imageUrl = window.matchMedia('(max-width: 810px)').matches && window.matchMedia('screen').matches ? mobile_image : desktop_image;

            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = `/${imageUrl}`;

            document.head.appendChild(link);
        }
    </script>

    <!-- Icons -->
    <link rel="shortcut icon" href="/media/favicon/favicon.png">

    <?php foreach ($icons['ios_startup'] as $icon) : ?>
        <?= sprintf('<link rel="apple-touch-startup-image" sizes="%s" href="%s">', $icon["sizes"], $icon["href"]); ?>
    <?php endforeach; ?>

    <?php foreach ($icons['ios'] as $icon) : ?>
        <?= sprintf('<link rel="apple-touch-icon" sizes="%s" href="%s">', $icon["sizes"], $icon["href"]); ?>
    <?php endforeach; ?>

    <?php foreach ($icons['icon'] as $icon) : ?>
        <?= sprintf('<link rel="icon" sizes="%s" href="%s">', $icon["sizes"], $icon["href"]); ?>
    <?php endforeach; ?>
    <style>
        <?php if ($colorConfig['enable_color_customization']['enable_custom_colors'] !== "0") : ?><?php $colorArray = $colorConfig['primary_colors'] + $colorConfig['secondary_colors']; ?> :root {
            <?php foreach ($colorArray as $code => $color) : ?><?php if (strpos($code, 'color') !== false) : ?><?= sprintf('--imported_%s: #%s;', $code, $color); ?><?php endif; ?><?php endforeach; ?>
        }

        <?php endif; ?>
    </style>
</head>

<body id="html-body">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>

</html>
