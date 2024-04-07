import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

export default function App() {
  const [rg, setRg] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [celular, setCelular] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [curso, setCurso] = useState('');
  const [exibirResultado, setExibirResultado] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const validarCampos = () => {
    return rg.trim() !== '' &&
           nome.trim() !== '' &&
           idade.trim() !== '' &&
           celular.trim() !== '' &&
           telefone.trim() !== '' &&
           email.trim() !== '' &&
           endereco.trim() !== '' &&
           curso.trim() !== '';
  };

  const validarIdade = () => {
    const idadeInt = parseInt(idade);
    return idadeInt >= 18;
  };

  const validarCurso = () => {
    const cursosValidos = ['Enfermagem', 'Administração', 'Desenvolvimento de Sistemas'];
    return cursosValidos.includes(curso);
  };

  const formatarCelular = (input) => {
    const regex = /^(\d{0,2})(\d{0,5})(\d{0,4})$/;
    const match = input.replace(/\D/g, '').match(regex);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return '';
  };

  const formatarTelefone = (input) => {
    const regex = /^(\d{0,2})(\d{0,4})(\d{0,4})$/;
    const match = input.replace(/\D/g, '').match(regex);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return '';
  };  

  const handleSubmit = () => {
    if (!validarCampos()) {
      setMensagemErro('Todos os campos são obrigatórios.');
      return;
    }

    if (!validarIdade()) {
      setMensagemErro('O candidato deve ser maior de 18 anos.');
      return;
    }

    if (!validarCurso()) {
      setMensagemErro('Curso inválido. Os cursos disponíveis são: Enfermagem, Administração e Desenvolvimento de Sistemas.');
      return;
    }
    setMensagemErro('');

    setExibirResultado(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Digite os dados do aluno:</Text>
      <TextInput onChangeText={setRg} style={styles.txtField} placeholder="RG" keyboardType="default"/>
      <TextInput onChangeText={setNome} style={styles.txtField} placeholder="Nome" />
      <TextInput onChangeText={setIdade} style={styles.txtField} placeholder="Idade" keyboardType="numeric" />
      <TextInput onChangeText={(text) => setCelular(formatarCelular(text))} value={celular} style={styles.txtField} placeholder="Celular" keyboardType="phone-pad" />
      <TextInput onChangeText={(text) => setTelefone(formatarTelefone(text))} value={telefone} style={styles.txtField} placeholder="Telefone" keyboardType="phone-pad" />
      <TextInput onChangeText={setEmail} style={styles.txtField} placeholder="E-mail" keyboardType="email-address" />
      <TextInput onChangeText={setEndereco} style={styles.txtField} placeholder="Endereço" />
      <Text style={styles.field}>Escolha o curso:</Text>
      <TextInput onChangeText={setCurso} style={styles.txtField} placeholder="Curso" />
      <TouchableOpacity onPress={handleSubmit} style={styles.botao}>
        <Text style={styles.field}>Enviar</Text>
      </TouchableOpacity>

      {exibirResultado && <Text style={styles.field}>Dados enviados com sucesso!</Text>}
      {mensagemErro !== '' && <Text style={styles.error}>{mensagemErro}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(53, 55, 75)',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  field: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  txtField: {
    backgroundColor: 'white',
    width: 'auto',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  botao: {
    backgroundColor: 'orange',
    width: 'auto',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
});