/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/*
  Copyright 2017 Google Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      https://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Safari doesn't print all console.groupCollapsed() arguments.
// Related bug: https://bugs.webkit.org/show_bug.cgi?id=182754
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const GREY = '#7b8a8d';
const GREEN = '#5ccc5a';
const YELLOW = '#f3b628';
const RED = '#c0392b';
const BLUE = '#2e7edb';
const BROWN = '#925a21';

const LOG_LEVELS = {
    debug: 0,
    log: 1,
    warn: 2,
    error: 3,
    silent: 4
};

const defaultColorMap = {
    debug: GREY,
    log: GREEN,
    warn: YELLOW,
    error: RED,
    groupCollapsed: BLUE,
    highlightCode: BROWN
};

class Logger {
    constructor(prefix, colorMap = {}, logLevel = 'log') {
        this.defaultLogLevel = logLevel === 'warn' ? 2 : 1;
        this.logLevel = this.defaultLogLevel;
        this.groupLevel = LOG_LEVELS.error;
        this.prefix = prefix;
        this.defaultExport = {
            groupEnd: this.groupEnd,
            unprefixed: {
                groupEnd: this.groupEnd
            }
        };
        this.levelToColor = Object.assign(defaultColorMap, colorMap);
        Object.keys(this.levelToColor).forEach(keyName => this.setupLogs(keyName, this.levelToColor[keyName]));

        return new Proxy(this, {
            get: (logger, field) => {
                if (field in logger) return logger[field];
                return this.defaultExport[field];
            },
        });
    }

    shouldPrint(minLevel) {
        return this.logLevel <= minLevel;
    }

    setLoggerLevel(newLogLevel) {
        this.logLevel = newLogLevel;
    }

    getLoggerLevel() {
        return this.logLevel;
    }

    print(keyName, logArgs, levelColor) {
        const logLevel = keyName.indexOf('group') === 0 ? this.groupLevel : LOG_LEVELS[keyName];
        if (!this.shouldPrint(logLevel)) return;

        if (!levelColor || (keyName === 'groupCollapsed' && isSafari)) {
            console[keyName](...logArgs);
            return;
        }

        console[keyName](...this.highlight(this.prefix, levelColor), ...logArgs);
    }

    groupEnd() {
        if (this.shouldPrint(this.groupLevel)) {
            console.groupEnd();
        }
    }

    setupLogs(keyName, color) {
        this.defaultExport[keyName] = (...args) => this.print(keyName, args, color);
        this.defaultExport.unprefixed[keyName] = (...args) => this.print(keyName, args);
    }

    highlight(string, color = this.levelToColor.highlightCode) {
        return [
            `%c${string}`,
            `background: ${color}; color: white; padding: 2px 0.5em; border-radius: 0.5em;`,
        ];
    }
}

export default Logger;
