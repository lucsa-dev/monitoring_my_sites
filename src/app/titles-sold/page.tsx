'use client'
import { Button, Divider, Form, Input, InputNumber, Radio, Tooltip, Upload, UploadProps, message } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { TitlesSoldFormValues } from './titlesSoldFormValues.type';
import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

export default function TitlesSold() {
  const [file, setFile] = useState<File | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: TitlesSoldFormValues) => { 
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('cnpj', values.cnpj);
    formData.append('praca', values.praca);
    formData.append('uploadSpreadsheet', file);
    formData.append('version', values.version.toString());
    formData.append('susep', values.susep);
    formData.append('raffleDate', values.raffleDate);
    formData.append('raffleNumber', values.raffleNumber.toString());

    const response = await fetch('/api/titles-sold', {
      method: 'POST',
      body: formData, 
    })
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = contentDisposition?.split('filename=')[1];
    //download zipfile
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    
    };
  

  return (
    <main className="flex min-h-screen flex-col p-10 items-center">
    <h1 className='text-2xl'>
        Remessa de Títulos Vendidos
    </h1>
    <Divider />
    <Form name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Nome ou Sigla" 
          tooltip="Nome ou sigla da Endidade Filantrópica"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o nome ou sigla da entidade filantrópica!',
            },
          ]}
          >
            <Input maxLength={15} />
        </Form.Item>
        <Form.Item 
          name="cnpj" 
          label="CNPJ" 
          rules={[
            {
              required: true,
              message: 'Por favor, insira o CNPJ!',
            },
          ]}
        >
            <MaskedInput
                mask={
                    ' 00.000.000/0000-00'
                }
            />  
        </Form.Item>
        <Form.Item 
          name="uploadSpreadsheet" 
          label="Relatório de Títulos Vendidos"
          tooltip="Um arquivo CSV com os títulos vendidos exportados do SDR!"
          rules={[
            {
              required: file === null, // Aplicar a validação required apenas se 'file' for null
              message: 'Por favor, selecione um arquivo CSV!',
            },
          ]}>
            <Upload
              maxCount={1}
              accept='.csv'
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}>
              <Button>Selecione o arquivo</Button>
            </Upload>
        </Form.Item>
        <Form.Item 
          name="praca" 
          label="Código da praça" 
          rules={[
            {
              required: true,
              message: 'Por favor, insira o código da praça!',
            },
          ]}
        >
            <Input maxLength={3} />
        </Form.Item>
        <Form.Item 
          name="version" 
          label="Versão do arquivo" 
          rules={[
            {
              required: true,
              message: 'Por favor, insira a versão do arquivo!',
            },
          ]}
        >
            <InputNumber maxLength={6} />
        </Form.Item>
        <Form.Item 
          name="susep" 
          label="Código do processo SUSESP" 
          rules={[
            {
              required: true,
              message: 'Por favor, insira o código do processo SUSESP!',
            },
          ]}
        >
            <Input maxLength={17} />
        </Form.Item>
        <Form.Item 
          name="raffleDate" 
          label="Data do sorteio" 
          rules={[
            {
              required: true,
              message: 'Por favor, insira a data do sorteio!',
            },
          ]}
        >
            <Input type="date" name="raffleDate" />
        </Form.Item>
        <Form.Item name="raffleNumber" label="Número do sorteio" rules={[
          {
            required: true,
            message: "Por favor insira um número!",
          },
          {
            pattern: /^[\d]{0,3}$/,
            message: "Valor deve conter apenas 3 caracteres",
          },
          ]}>
            <Input type="number" name="raffleNumber" />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit">
                Enviar
            </Button>
        </Form.Item>
    </Form>
    {contextHolder}
    </main>
  )
}
