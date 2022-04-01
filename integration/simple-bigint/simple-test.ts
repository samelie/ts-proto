import { SimpleWithMap } from './simple';

describe('simple', () => {
  it('can fromPartial maps', () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 1 },
      longLookup: { '1': BigInt(2), '2': BigInt(1) },
      longLookupUint64: { '9007199254740992': BigInt(9007199254740993) },
    });
    expect(s1).toMatchInlineSnapshot(`
    Object {
      "intLookup": Object {
        "1": 2,
          "2": 1,
        },
        "longLookup": Object {
          "1": 2n,
          "2": 1n,
        },
        "longLookupInt64": Object {},
        "longLookupUint64": Object {
          "9007199254740992": 9007199254740992n,
        },
        "nameLookup": Object {},
      }
      `);
  });

  it('can toJSON/fromJSON maps', () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 1 },
      longLookup: { '1': BigInt(2), '2': BigInt(1) },
      longLookupUint64: { '9007199254740992': BigInt(9007199254740993) },
    });

    const json = SimpleWithMap.toJSON(s1);
    expect(json).toMatchInlineSnapshot(`
      Object {
        "intLookup": Object {
          "1": 2,
          "2": 1,
        },
        "longLookup": Object {
          "1": "2",
          "2": "1",
        },
        "longLookupInt64": Object {},
        "longLookupUint64": Object {
          "9007199254740992": "9007199254740992",
        },
        "nameLookup": Object {},
      }
    `);

    const s2 = SimpleWithMap.fromJSON(JSON.parse(JSON.stringify(json)));
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "intLookup": Object {
          "1": 2,
          "2": 1,
        },
        "longLookup": Object {
          "1": "2",
          "2": "1",
        },
        "longLookupInt64": Object {},
        "longLookupUint64": Object {
          "9007199254740992": "9007199254740992",
        },
        "nameLookup": Object {},
      }
    `);
  });
});
