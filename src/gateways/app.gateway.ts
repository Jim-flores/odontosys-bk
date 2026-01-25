
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  /* ============================
     CONEXIÓN (opcional)
     ============================ */
  handleConnection(client: Socket) {
    // aquí luego puedes validar token si quieres
  }

  /* ============================
     REGISTRO DE USUARIO
     (para eventos dirigidos)
     ============================ */
  @SubscribeMessage('register')
  handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    if (!userId) return;
    client.join(`user:${userId}`);
  }

  /* ============================
     CASO 1: EVENTO GLOBAL
     Front → Back → Todos los clientes
     ============================ */
  @SubscribeMessage('emit:global')
  handleGlobalEmit(
    @MessageBody() event: string,
  ) {
    if (!event) return;
    this.server.emit(event);
  }

  /* ============================
     CASO 2: EVENTO A UN USUARIO
     Front → Back → Usuario específico
     ============================ */
  @SubscribeMessage('emit:user')
  handleUserEmit(
    @MessageBody()
    payload: { userId: string; event: string },
  ) {
    const { userId, event } = payload;
    if (!userId || !event) return;

    this.server.to(`user:${userId}`).emit(event);
  }
}
