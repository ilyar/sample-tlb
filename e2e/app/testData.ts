export const testData = {
    schemas: {
        valid: 'message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;',
        invalid: 'invalid schema',
        simple: '_ x:# = Foo;',
    },

    boc: {
        valid: 'te6cckEBAQEAFwAAKSioyuboQNrK5ubCzspA0txAxsrY2Whv0fw=',
    },

    data: {
        valid: '{"len": 5, "text": "Hello"}',
        long: 'A'.repeat(5000),
    },

    timeouts: {
        short: 500,
        medium: 1000,
        long: 2000,
    },

    viewport: {
        small: { width: 800, height: 600 },
        large: { width: 1920, height: 1080 },
    },
} as const;
