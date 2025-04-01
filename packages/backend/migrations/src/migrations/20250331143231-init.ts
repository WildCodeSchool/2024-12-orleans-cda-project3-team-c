import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER SCHEMA mingo  DEFAULT COLLATE utf8mb4_general_ci ;
    `.execute(trx);

    await sql`
      CREATE TABLE role (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL UNIQUE
      );
      `.execute(trx);

    await sql`
      CREATE TABLE account_status (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL UNIQUE
      );
      `.execute(trx);

    await sql`
      CREATE TABLE user (
        id INT PRIMARY KEY AUTO_INCREMENT,  
        username VARCHAR(30) NOT NULL UNIQUE,
        mail VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        profile_picture VARCHAR(255) NOT NULL DEFAULT "user.png",
        biography TEXT NULL,
        notoriety INT NOT NULL DEFAULT 0,
        private BOOLEAN NOT NULL DEFAULT false,
        account_status_id INT NOT NULL DEFAULT 1,
        role_id INT NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_user_role_id FOREIGN KEY (role_id) REFERENCES role(id),
        CONSTRAINT fk_user_account_status_id FOREIGN KEY (account_status_id) REFERENCES account_status(id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE follow_up (
        follower_id INT NOT NULL,
        followee_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_follower_id FOREIGN KEY (follower_id) REFERENCES user(id),
        CONSTRAINT fk_followee_id FOREIGN KEY (followee_id) REFERENCES user(id),
        CONSTRAINT PRIMARY KEY (follower_id, followee_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE block (
        blocker_id INT NOT NULL,
        blockee_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_blocker_id FOREIGN KEY (blocker_id) REFERENCES user(id),
        CONSTRAINT fk_blockee_id FOREIGN KEY (blockee_id) REFERENCES user(id),
        CONSTRAINT PRIMARY KEY (blocker_id, blockee_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE status (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        text VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_status_user_id FOREIGN KEY (user_id) REFERENCES user(id)
      ); 
      `.execute(trx);

    await sql`
      CREATE TABLE post (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        picture TEXT NOT NULL,
        description TEXT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT post_user_id FOREIGN KEY (user_id) REFERENCES user(id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE comment (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        post_id INT NOT NULL,
        responds_to INT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_comment_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_comment_post_id FOREIGN KEY (post_id) REFERENCES post(id),
        CONSTRAINT fk_comment_responds_to FOREIGN KEY (responds_to) REFERENCES comment(id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE post_like (
        user_id INT NOT NULL,
        post_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_post_like_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_post_like_post_id FOREIGN KEY (post_id) REFERENCES post(id),
        CONSTRAINT PRIMARY KEY (user_id, post_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE comment_like (
        user_id INT NOT NULL,
        comment_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_comment_like_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_comment_like_comment_id FOREIGN KEY (comment_id) REFERENCES post(id),
        CONSTRAINT PRIMARY KEY (user_id, comment_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE reaction (
        user_id INT NOT NULL,
        post_id INT NOT NULL,
        emoji VARCHAR(16) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_reaction_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_reaction_post_id FOREIGN KEY (post_id) REFERENCES post(id),
        CONSTRAINT PRIMARY KEY (user_id, post_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE discussion (
        id INT PRIMARY KEY AUTO_INCREMENT
      );
      `.execute(trx);

    await sql`
      CREATE TABLE discussion_participant (
        discussion_id INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_discussion_participant_discussion_id FOREIGN KEY (discussion_id) REFERENCES discussion(id),
        CONSTRAINT fk_discussion_participant_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT PRIMARY KEY (discussion_id, user_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE message (
        id INT PRIMARY KEY AUTO_INCREMENT,
        discussion_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        responds_to INT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_message_discussion_id FOREIGN KEY (discussion_id) REFERENCES discussion(id),
        CONSTRAINT fk_message_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_message_responds_to FOREIGN KEY (responds_to) REFERENCES message(id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE message_like (
        user_id INT NOT NULL,
        message_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_message_like_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_message_like_message_id FOREIGN KEY (message_id) REFERENCES message(id),
        CONSTRAINT PRIMARY KEY (user_id, message_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE tag (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(125) NOT NULL UNIQUE
      );
      `.execute(trx);

    await sql`
      CREATE TABLE post_tag (
        tag_id INT NOT NULL,
        post_id INT NOT NULL,
        CONSTRAINT fk_post_tag_tag_id FOREIGN KEY (tag_id) REFERENCES tag(id),
        CONSTRAINT fk_post_tag_post_id FOREIGN KEY (post_id) REFERENCES post(id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE tag_subscription (
        user_id INT NOT NULL,
        tag_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_tag_subscription_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_tag_subscription_tag_id FOREIGN KEY (tag_id) REFERENCES tag(id),
        CONSTRAINT PRIMARY KEY (user_id, tag_id)
      );
      `.execute(trx);

    await sql`
      CREATE TABLE report_status (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL UNIQUE
      );
      `.execute(trx);

    await sql`
      CREATE TABLE report (
        id INT PRIMARY KEY AUTO_INCREMENT,
        reporter_id INT NOT NULL,
        reportee_id INT NOT NULL,
        motive TEXT NOT NULL,
        status_id INT NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        ruled_at DATETIME NULL,
        CONSTRAINT fk_report_reporter_id FOREIGN KEY (reporter_id) REFERENCES user(id),
        CONSTRAINT fk_report_reportee_id FOREIGN KEY (reportee_id) REFERENCES user(id),
        CONSTRAINT fk_report_status_id FOREIGN KEY (status_id) REFERENCES report_status(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE notification_type (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL UNIQUE
      );
    `.execute(trx);

    await sql`
      CREATE TABLE notification (
        id INT PRIMARY KEY AUTO_INCREMENT,
        type_id INT NOT NULL,
        recipient_id INT NOT NULL,
        message TEXT NOT NULL,
        redirect_to INT NULL,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        read_at DATETIME NULL,
        CONSTRAINT notification_type_id FOREIGN KEY (type_id) REFERENCES notification_type(id),
        CONSTRAINT notification_recipient_id FOREIGN KEY (recipient_id) REFERENCES user(id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE notification IF EXISTS;
      DROP TABLE notificationj_type IF EXISTS;
      DROP TABLE report IF EXISTS;
      DROP TABLE report_status IF EXISTS;
      DROP TABLE tag_subscription IF EXISTS;
      DROP TABLE post_tag IF EXISTS;
      DROP TABLE tag IF EXISTS;
      DROP TABLE message_like IF EXISTS;
      DROP TABLE message IF EXISTS;
      DROP TABLE discussion_participant IF EXISTS;
      DROP TABLE discussion IF EXISTS;
      DROP TABLE reaction IF EXISTS;
      DROP TABLE comment_like IF EXISTS;
      DROP TABLE post_like IF EXISTS;
      DROP TABLE comment IF EXISTS;
      DROP TABLE post IF EXISTS;
      DROP TABLE status IF EXISTS;
      DROP TABLE block IF EXISTS;
      DROP TABLE follow_up IF EXISTS;
      DROP TABLE user IF EXISTS;
      DROP TABLE account_status IF EXISTS;
      DROP TABLE role IF EXISTS;
    `.execute(trx);
  });
}
