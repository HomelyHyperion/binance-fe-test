import { Selector } from 'testcafe';

fixture `Market Widget UI Tests`
  .page `http://localhost:3000` 

test('test search functionality', async t => {
  await t
    .click(Selector('input').withAttribute('placeholder', 'Search'))
    .typeText(Selector('input').withAttribute('placeholder', 'Search'), 'bnb', { replace: true })
    .expect(Selector('td').innerText).contains('BNB/BTC');
});

test('test saving to favorites', async t => {
  await t
    .click(Selector('td .star'))
    .click(Selector('.star'))
    .expect(Selector('td').innerText).contains('BTC');
});

test('test sorting functionality', async t => {
  await t
    .click(Selector('th span'))
    .expect(Selector('td').innerText).contains('Z');

  await t
    .click(Selector('th:nth-of-type(3) span'))
    .click(Selector('th:nth-of-type(2) span'))
    .expect(Selector('td').innerText).notContains('Z');
});

test('test radio buttons', async t => {
  await t
    .click(Selector('#volume + label'))
    .expect(Selector('th:nth-of-type(3) span').innerText).contains('Volume');

  await t
    .click(Selector('#change + label'))
    .expect(Selector('th:nth-of-type(3) span').innerText).contains('Change');
});

test('test selecting options', async t => {
  await t
    .click(Selector('select'))
    .click(Selector('select option'))
    .expect(Selector('td').innerText).contains('ETH');

  await t
    .click(Selector('select:nth-of-type(2)'))
    .click(Selector('select:nth-of-type(2) option:nth-of-type(2)'))
    .expect(Selector('td').innerText).contains('USDT');

  await t
    .click(Selector('button:nth-of-type(2)'))
    .expect(Selector('td').innerText).contains('5x');

  await t
    .click(Selector('button:nth-of-type(3)'))
    .expect(Selector('td').innerText).contains('BNB');    
});