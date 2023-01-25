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
            identifier: `<?= $this->getIdentifier(); ?>`,
            description: `<?= $this->getDescription(); ?>`
        };
        window.contentConfiguration = <?= json_encode($contentConfig) ?> || {};
        window.storeCurrency = '<?= $this->getStoreCurrency() ?>';
        window.catalog_default_sort_by = '<?= $this->getCatalogDefaultSortBy() ?>';

        // Multistore
        // do reverse sort in order prevent an issue like store code `en` replaces store code `en_us`
        window.storeList = JSON.parse(`<?= $this->getStoreListJson() ?>`).sort().reverse();
        window.storeRegexText = `/(${window.storeList.join('|')})?`;
        window.website_code = '<?= $this->getWebsiteCode() ?>';
    </script>

    <!-- Preload i18n chunk for the store -->
    <link rel="preload" as="script" href="<?= $this->getLocaleChunkUrl() ?>">

    <!-- Font -->
    <!-- <link rel="stylesheet" href="https://use.typekit.net/fji5tuz.css"> -->

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

    <!-- Manifest -->
    <link rel="manifest" href="/media/webmanifest/manifest.json">
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
