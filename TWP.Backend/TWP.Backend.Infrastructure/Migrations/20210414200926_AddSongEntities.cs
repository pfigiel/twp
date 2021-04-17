using Microsoft.EntityFrameworkCore.Migrations;

namespace TWP.Backend.Infrastructure.Migrations
{
    public partial class AddSongEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Artist = table.Column<string>(type: "nvarchar(max)", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SongsSections",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SongEntityId = table.Column<long>(type: "bigint", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SongsSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SongsSections_Songs_SongEntityId",
                        column: x => x.SongEntityId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SongFragments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RepeatCount = table.Column<int>(type: "int", nullable: false),
                    SongSectionEntityId = table.Column<long>(type: "bigint", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SongFragments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SongFragments_SongsSections_SongSectionEntityId",
                        column: x => x.SongSectionEntityId,
                        principalTable: "SongsSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SongFragments_SongSectionEntityId",
                table: "SongFragments",
                column: "SongSectionEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_SongsSections_SongEntityId",
                table: "SongsSections",
                column: "SongEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SongFragments");

            migrationBuilder.DropTable(
                name: "SongsSections");

            migrationBuilder.DropTable(
                name: "Songs");
        }
    }
}
