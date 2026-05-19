import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Preview() {
  const router = useRouter();
  const params = useLocalSearchParams<{ 
    nome: string; cargo: string; empresa: string; anos: string; tecnologia: string; cor: string 
  }>();

  // Lógica de Nível (Badge)
  const anosNum = parseInt(params.anos);
  let nivel = "Júnior";
  let corBadge = "#808080"; // Cinza

  if (anosNum >= 6) {
    nivel = "Sênior";
    corBadge = "#FFD700"; // Dourado
  } else if (anosNum >= 3) {
    nivel = "Pleno";
    corBadge = "#007AFF"; // Azul
  }

  return (
    <View style={styles.container}>
      {/* Cartão Estilizado */}
      <View style={[styles.card, { backgroundColor: params.cor }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{params.nome?.charAt(0).toUpperCase()}</Text>
        </View>
        
        <Text style={styles.nome}>{params.nome}</Text>
        <Text style={styles.cargo}>{params.cargo} {params.empresa ? `at ${params.empresa}` : ''}</Text>
        <Text style={styles.tech}>Especialista em {params.tecnologia}</Text>

        <View style={[styles.badge, { backgroundColor: corBadge }]}>
          <Text style={styles.badgeText}>{nivel}</Text>
        </View>
      </View>

      {/* Botões de Ação */}
      <TouchableOpacity style={styles.btnEdit} onPress={() => router.back()}>
        <Text style={styles.btnEditText}>Editar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnFinish} onPress={() => router.replace('/sucesso')}>
        <Text style={styles.btnFinishText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f0f0' },
  card: { padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5, shadowColor: '#000' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { fontSize: 35, fontWeight: 'bold' },
  nome: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  cargo: { fontSize: 16, color: '#fff', opacity: 0.9, marginBottom: 10 },
  tech: { fontSize: 14, color: '#fff', fontStyle: 'italic' },
  badge: { marginTop: 15, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 },
  badgeText: { color: '#fff', fontWeight: 'bold' },
  btnEdit: { marginTop: 30, alignItems: 'center' },
  btnEditText: { color: '#666', textDecorationLine: 'underline' },
  btnFinish: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  btnFinishText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});