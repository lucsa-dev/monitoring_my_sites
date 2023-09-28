'use client'
import { Button, Divider, Form, Input, InputNumber, Radio, Upload, UploadProps } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { TitlesSoldFormValues } from './titlesSoldFormValues.type';
import { useState } from 'react';

export default function TitlesSold() {
  const [file, setFile] = useState<File | null>(null);
  
  const onFinish = async (values: TitlesSoldFormValues) => { 
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('cnpj', values.cnpj);
    formData.append('praca', values.praca);
    formData.append('environment', values.environment);
    formData.append('uploadSpreadsheet', file);
    formData.append('version', values.version.toString());
    formData.append('susep', values.susep);

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData, 
    });

    // Handle response if necessary
    const data = await response.json();
    };
  

  return (
    <main className="flex min-h-screen flex-col p-10 items-center">
    <h1 className='text-2xl'>
        Remessa de Títulos Vendidos
    </h1>
    <Divider />
    <Form
      name="control-hooks"
      onFinish={onFinish}
      

    >
        <Form.Item name="name" label="'Nome ou Sigla" rules={[{ required: true }]}>
            <Input  maxLength={15} />
        </Form.Item>
        <Form.Item name="environment" label="Ambiente" rules={[{ required: true }]}>
          <Radio.Group name="environment">
            <Radio.Button value="A">Processamento</Radio.Button>
            <Radio.Button value="C">Construção</Radio.Button>
            <Radio.Button value="D">Teste Integrado</Radio.Button>
            <Radio.Button value="H">Homologação</Radio.Button>
            <Radio.Button value="P">Produção</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="uploadSpreadsheet" label="Planilha de Títulos Vendidos" rules={[{ required: true }]}>
            <Upload name="uploadSpreadsheet"
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}>
              <Button>Selecione o arquivo</Button>
            </Upload>
        </Form.Item>
        <Form.Item name="praca" label="Código da praça" rules={[{ required: true }]}>
            <Input name="environment" maxLength={3} defaultValue='000'  />
        </Form.Item>
        <Form.Item name="cnpj" label="CNPJ" rules={[{ required: true }]}>
            <MaskedInput
                mask={
                    ' 00.000.000/0000-00'
                }
            />  
        </Form.Item>

        <Form.Item name="version" label="Versão do arquivo" rules={[{ required: true }]}>
            <InputNumber name="version" defaultValue={1} />
        </Form.Item>

        <Form.Item name="susep" label="Código do processo SUSESP" rules={[{ required: true }]}>
            <Input name="susep" maxLength={17} />
        </Form.Item>

        <Form.Item>
            <Button htmlType="submit">
                Enviar
            </Button>
        </Form.Item>
            
    </Form>
    </main>
  )
}
