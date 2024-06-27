import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // Add this import
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://dorluna22:tyuiop@ac-bbnislj-shard-00-00.hszy8as.mongodb.net:27017,ac-bbnislj-shard-00-01.hszy8as.mongodb.net:27017,ac-bbnislj-shard-00-02.hszy8as.mongodb.net:27017/aplicacion?replicaSet=atlas-alngb4-shard-0&ssl=true&authSource=admin',
    ),
    UsersModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
