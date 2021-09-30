/* eslint-disable */

const { createElement } = require('react');

// eslint-disable-next-line func-names
module.exports = function (args) {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    
    const getNS = function () {
        var array = [
            createElement(
                'li',
                null,
                'Plugin for Page component – ',
                '(function) ',
                createElement(
                    'strong',
                    null,
                    args.namespaces.namespace
                )
            )
        ];

        switch (args.type) {
            case 'server':
                array.push(createElement(
                    'li',
                    null,
                    'Plugin for getServerSideProps function – ',
                    '(function) ',
                    createElement(
                        'strong',
                        null,
                        args.namespaces.server_namespace
                    )
                ));
                break;
            case 'static-with-data':
                array.push(createElement(
                    'li',
                    null,
                    'Plugin for getStaticProps function – ',
                    '(function) ',
                    createElement(
                        'strong',
                        null,
                        args.namespaces.static_namespace
                    )
                ));
                break;
        }

        return array;
    };

    return createElement(
        'main',
        {
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
                fontSize: '18px',
                lineHeight: '2'
            }
        },
        createElement(
            'div',
            {
                style: {
                    padding: '10px 50px 30px',
                    textAlign: 'left'
                }
            },
            createElement(
                'h1',
                null,
                'This page is not yet implemented!'
            ),
            createElement(
                'p',
                null,
                'You have successfully declared this page (',
                createElement('strong', null, args.page),
                ') in ',
                createElement('strong', null, 'package.json'),
                '!',
                createElement('br'),
                'Now, you need to create a plugin to provide an implementation for it! ',
                createElement('br'),
                'Following plugin endpoints are available:'
            ),
            createElement(
                'ul',
                null,
                ...getNS()
            )
        )
    );
};
