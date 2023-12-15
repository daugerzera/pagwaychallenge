insert into
  pagway.transacao (
    id,
    valor_transacao, 
    descricao_transacao, 
    data_criacao_transacao, 
    nome_portador_cartao,
    numero_cartao,
    validade_cartao,
    codigo_seguranca_cartao
  )
  values (
    1, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-01-15', '753'
  ), (
    2, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-02-15', '753'
  ), (
    3, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-03-15', '753'
  ), (
    4, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-04-15', '753'
  ), (
    5, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-05-15', '753'
  ), (
    6, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-06-15', '753'
  ), (
    7, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-07-15', '753'
  ), (
    8, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-08-15', '753'
  ), (
    9, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-09-15', '753'
  ), (
    10, 10000, 'Smartband XYZ 3.0', '2023-12-15', 'fulano cuiabano', '1234', '2027-10-15', '753'
  );

SELECT setval(pg_get_serial_sequence('pagway.transacao', 'id') , COALESCE(max(id) + 1, 1) , false) FROM  pagway.transacao;