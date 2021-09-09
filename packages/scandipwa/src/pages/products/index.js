/* eslint-disable */
import renderEmptyPage from '@tilework/mosaic-nextjs-scripts/lib/pages/empty-page';

/**
 * ! This file is a "placeholder" / injection point generated,
 * ! so that the NextJS static router (and Babel plugin) would
 * ! recognize this file as a page. You can override this page
 * ! behaviour using plugin system!
 */

/** @namespace Pages/products/index/Page */
const Page = () => (
    process.env.NODE_ENV === 'production'
        ? null
        : renderEmptyPage(JSON.parse('{"type":"server","page":"products/index","namespaces":{"namespace":"Pages/products/index/Page","static_namespace":"Pages/products/index/getStaticProps","server_namespace":"Pages/products/index/getServerSideProps"}}'))
);

/** @namespace Pages/getCommonServerSideProps */
const getCommonServerSideProps = () => ({ props: {} });

/** @namespace Pages/products/index/getServerSideProps */
const getServerSideProps = () => getCommonServerSideProps();

export { getServerSideProps };
export default Page;
