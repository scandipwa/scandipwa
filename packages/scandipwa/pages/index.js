/* eslint-disable */
import renderEmptyPage from '@tilework/mosaic-nextjs-scripts/lib/pages/empty-page';

/**
 * ! This file is a "placeholder" / injection point generated,
 * ! so that the NextJS static router (and Babel plugin) would
 * ! recognize this file as a page. You can override this page
 * ! behaviour using plugin system!
 */

/** @namespace Pages/index/Page */
const Page = () => (
    process.env.NODE_ENV === 'production'
        ? null
        : renderEmptyPage(JSON.parse('{"type":"server","page":"index","namespaces":{"namespace":"Pages/index/Page","static_namespace":"Pages/index/getStaticProps","server_namespace":"Pages/index/getServerSideProps"}}'))
);

/** @namespace Pages/getCommonServerSideProps */
const getCommonServerSideProps = () => ({ props: {} });

/** @namespace Pages/index/getServerSideProps */
const getServerSideProps = () => getCommonServerSideProps();

export { getServerSideProps };
export default Page;
